import express, { Application, Request, Response } from "express";
import cors from "cors";
import ivm from "isolated-vm";

const app: Application = express();

const port: number = 3001;

app.use(cors());
// app.use(express.text({ type: () => true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO: 같은 디렉터리에서 가상환경을 구축
app.post("/todo", (req: Request, res: Response) => {
  try {
    const { code: testCode, lang } = req.body;
    const code = `(function() { return ${testCode}; })()`;
    const isolate = new ivm.Isolate({ memoryLimit: 8 });
    const script = isolate.compileScriptSync(code);
    const context = isolate.createContextSync();
    const result = script.runSync(context);
    // console.log(req.body);
    res.status(200).send(`${result}`);
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
