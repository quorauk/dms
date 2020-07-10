"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const websockets = {};
const wss = new ws_1.default.Server({
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
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        // Below options specified as default values.
        concurrencyLimit: 10,
        threshold: 1024,
    },
});
var latestData = "{}";
wss.on("connection", function connection(ws) {
    return __awaiter(this, void 0, void 0, function* () {
        const hookUUID = uuid_1.v4();
        console.log(`to ${hookUUID}: ${latestData}`);
        ws.send(latestData);
        ws.on("message", (msg) => {
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
});
//# sourceMappingURL=index.js.map