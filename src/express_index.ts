import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
const httpServer = app.listen(3000);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello! Message From Server!!");
});
