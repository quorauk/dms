import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import WebSocket from "ws";
import { TSL } from "./tsl";
import { Observer } from "./tsl/observer";
import express from "express"

dotenv.config();

// const websockets: { [key: string]: WebSocket } = {};
const PORT = process.env.PORT || 3000;
const INDEX = '/app/index.html';

const server = express()
  .use(express.static(__dirname + "/app"))
  .get('/admin', (req,res) =>{
    res.sendFile(INDEX, {root: __dirname});
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocket.Server({
  server: server,
  // port: parseInt(process.env.PORT || "3030"),
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed.
  },
});

var latestData = {};
var globalClassification = []

wss.on("connection", async function connection(ws) {
  const hookUUID = uuidv4();

  ws.send(JSON.stringify({"scoreboardState": latestData}));
  ws.send(JSON.stringify({"classification": globalClassification}))

  ws.on("message", (msg: string) => {
    console.log(`from ${hookUUID}: ${msg}`);
    latestData = JSON.parse(msg);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({"scoreboardState": latestData}));
      }
    })
  });
});

const blah = () => {
  const doAsyncStuff = async () => {
    const tsl = new TSL("202982")
    await tsl.connect()
    tsl.getSprintSessionsData()
    tsl.getSessionData()
    tsl.registerConnectionID()
    const observer = new Observer(tsl)
    observer.onClassificationUpdated((classification) => {
      globalClassification = classification

      console.log("sending classification")
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({"classification": classification}))
      })
    })
  }
  doAsyncStuff()
}

blah()