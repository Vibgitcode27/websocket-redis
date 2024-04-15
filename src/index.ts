import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage, ServerResponse } from "http";
import http from "http";

const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    console.log(new Date() + "received request for " + request.url);
    response.write("hi there");
    response.end();
  }
);

const wss = new WebSocketServer({ server });

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

server.listen(8080, () => {
  console.log(new Date() + " Server is listening to post 8080");
});
