const { v4: uuidV4 } = require("uuid");
const ws = new require("ws");
const wss = new ws.Server({ port: 8080 });

const clients = new Map();

wss.on("connection", function connection(ws) {
  const id = uuidV4();
  console.log("connection made with id", id);
  clients.set(id, ws);

  ws.on("message", function (message) {
    console.log("message received:", message.toString());

    clients.forEach((client) => {
      client.send(message);
    });
  });

  ws.on("close", function () {
    console.log("deleting client with id", id);
    clients.delete(id);
  });
});
