import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

const port: number = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: 같은 디렉터리에서 가상환경을 구축

app.post("/todo", (req: Request, res: Response) => {
  // res.send("Hello toto");
  console.log(req.body);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
