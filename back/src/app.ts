import express, { Application, Request, Response } from "express";
import cors from "cors";

import problem from "./routes/problem";

const app: Application = express();

const port: number = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/problem", problem);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
