const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const socketHandlers = require("./socket/handlers");
const { load, save } = require("./storage");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET","POST"] }
});

app.get("/api/topology", (req, res) => {
  const data = load();
  res.json(data);
});

app.post("/api/topology", (req, res) => {
  const { devices, links, fileName } = req.body;
  const ok = save({ devices, links }, fileName);
  res.json({ success: ok });
});

app.get("/health", (req, res) => res.json({ status:"ok" }));

socketHandlers(io);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});