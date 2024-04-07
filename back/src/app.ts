import express, { Application } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import problem from "./routes/problem";
import { problemSocket } from "./services/problem-socket";

const app: Application = express();
const server = http.createServer(app);
const port: number = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

problemSocket(io);
app.use("/api/problem", problem);

server.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
