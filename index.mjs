import { WebSocketServer } from "ws";
import express from "express";

const wss = new WebSocketServer({ port: 8080 });

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  wss.clients.forEach((ws) => {
    ws.send("testing this thing out");
  });
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
