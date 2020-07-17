import WebSocket from "ws"
import request from "axios"
import fs from "fs"

export class TSL {
    waiter: any;
    websocket: any;
    increment: number;
    eventID: string;
    listeners: {}

    constructor(eventID) {
        this.waiter = {}
        this.websocket = null
        this.increment = 1
        this.eventID = eventID
    }

    connect = async () => {
        const wssEndpoint = await getWebhookURL()
        const websocket = new WebSocket(wssEndpoint)

        return new Promise((resolve) => {
            websocket.addEventListener("message", (msg) => {
                const jsonMsg = JSON.parse(msg.data)
                if (this.waiter.hasOwnProperty(jsonMsg.I)) {
                    this.waiter[jsonMsg.I](jsonMsg.R)
                    delete this.waiter[jsonMsg.I]
                    return
                } 
            })

            // websocket.addEventListener("message", (msg) => {
            //     fs.appendFile(".txt", msg.data + "\n", () => {})
            // })

            websocket.addEventListener("error", (err) => {
                console.log("error", err)
            })

            websocket.addEventListener("open", () => {
                console.log("opened")
                this.websocket = websocket
                resolve()
            })
        })
    }


    callFunctionName = async (functionName, ...args) => {
        return new Promise((resolve, reject) => {
            this.waiter[this.increment] = (data) => {
                resolve(data)
            }
            setTimeout(() => {
                if (this.waiter.hasOwnProperty(this.increment)) {
                    reject("response not received")
                }
            }, 5000)
            this.websocket.send(JSON.stringify({"H":"livetiming","M":functionName,"A":[this.eventID, ...args],"I":this.increment}))
            this.increment++
        })
    }

    getClassification = async () => this.callFunctionName("GetClassification") as Promise<Array<any>>
    getSessionData = async () => this.callFunctionName("GetSessionData")
    registerConnectionID = async () => this.callFunctionName("RegisterConnectionId", true, true, true)
}

//@ts-ignore
const timestamp = () => Math.floor(new Date() / 1000)

const getWebhookURL = async () => {
    const resp = await request.get(`https://livetiming.tsl-timing.com/signalr/negotiate?clientProtocol=2.1&connectionData=%5B%7B%22name%22%3A%22livetiming%22%7D%5D&_=${timestamp()}`)
    const ConnectionToken = encodeURIComponent(resp.data.ConnectionToken)
    await request.get(`https://livetiming.tsl-timing.com/signalr/start?transport=webSockets&clientProtocol=2.1&connectionToken=${ConnectionToken}&connectionData=%5B%7B%22name%22%3A%22livetiming%22%7D%5D&_=${timestamp()}`)

    return `wss://livetiming.tsl-timing.com/signalr/connect?transport=webSockets&clientProtocol=2.1&connectionToken=${ConnectionToken}&connectionData=%5B%7B%22name%22%3A%22livetiming%22%7D%5D&tid=9`
}