import WebSocket from "ws";
import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const websockets: { [key: string]: WebSocket } = {};

const wss = new WebSocket.Server({
  port: parseInt(process.env.PORT),
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

var latestData = "{}";

wss.on("connection", async function connection(ws) {
  const hookUUID = uuidv4();

  console.log(`to ${hookUUID}: ${latestData}`);
  ws.send(latestData);

  ws.on("message", (msg: string) => {
    console.log(`from ${hookUUID}: ${msg}`);
    latestData = msg;
    Object.entries(websockets).map(([uuid, ws]) => {
      if (uuid !== hookUUID) {
        console.log(`to ${uuid}: ${msg}`);
        ws.send(latestData);
      }
    });
  });

  ws.on("close", () => {
    delete websockets[hookUUID];
  });

  websockets[hookUUID] = ws;
});
