const ws = new require("ws");
const wss = new ws.Server({ port: 8080 });

const clients = new Set();

wss.on("connection", function connection(ws) {
  clients.add(ws);

  ws.on("message", function (message) {
    console.log("message received:", message.toString());

    for (let client of clients) {
      client.send(message);
    }
  });

  ws.on("close", function () {
    clients.delete(ws);
  });
});
