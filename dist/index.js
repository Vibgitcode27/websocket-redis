"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((request, response) => {
    console.log(new Date() + "received request for " + request.url);
    response.write("hi there");
    response.end();
});
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send("Hello! Message From Server!!");
});
server.listen(8080, () => {
    console.log(new Date() + " Server is listening to post 8080");
});
