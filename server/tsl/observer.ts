import { TSL } from "./index"

export class Observer {
    tsl: TSL
    classification: Array<any>
    classData: Array<any>
    clients: Array<(a: any) => void>
    competitors: Array<any>

    constructor(tsl: TSL) {
        tsl.getClassification().then((classification) => {
            this.classification = classification
        })
        this.tsl = tsl
        this.clients = []
        setInterval(async () => {
            this.classification = await tsl.getClassification()
            this.clients.forEach((client) => {
                client(this.classification)
            })
        }, 30000)
        tsl.websocket.addEventListener("message", (msg) => {
            const jsonMSG = JSON.parse(msg.data)
            if (jsonMSG.M) {
                jsonMSG.M.map(element => {
                    switch(element.M) {
                        case "updateResult":
                            const index = this.classification.findIndex((e, index) => e.ID == element.A.ID)
                            this.classification[index] = element.A
                            this.clients.forEach((client) =>{
                                client(this.classification)
                            })
                            break;
                        case "setTimeRemaining": 
                            break;
                        default:
                    }
                })
            }
        })
    }

    onClassificationUpdated = (fun: (a : any) => void) => {
        fun(this.classification)
        this.clients.push(fun)
    }
}