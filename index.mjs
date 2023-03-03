import { WebSocketServer } from "ws";
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

dotenv.config();

const { MONGODB_URI } = process.env;
const client = new MongoClient(MONGODB_URI);

const wss = new WebSocketServer({ port: 8080 });

const app = express();
app.use(bodyParser.json());

const port = 3001;

app.get("/guesses", async (req, res) => {
  let data = [];
  try {
    const db = client.db("due-date");
    const guesses = db.collection("guesses");
    data = await guesses.find({}).toArray();
  } catch {}

  res.send(data);
});

app.post("/newGuess", async (req, res) => {
  const { name, date } = req.body;

  try {
    const db = client.db("due-date");
    const guesses = db.collection("guesses");
    await guesses.insertOne({ name, date });
  } catch {}
  // wss.clients.forEach((ws) => {
  //   ws.send("testing this thing out");
  // });
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const cleanup = () => {
  console.log("closing");
  client.close();
  process.exit();
};
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
