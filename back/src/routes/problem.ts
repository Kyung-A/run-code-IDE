import express, { Application, Request, Response } from "express";
import { problemList, problem } from "../mock/problem";
import ivm from "isolated-vm";

const router = express.Router();

router.get("/", (_, res: Response) => {
  try {
    res.status(200).send(problemList);
  } catch (e) {
    console.error(e);
  }
});

router.get("/:problemId", (req: Request, res: Response) => {
  try {
    const id = req.params.problemId;
    const data = problem.find((v) => v.id === id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
  }
});

// TODO: 목업데이터에 맞게 결괏값 반환하기
router.post("/:problemId", async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const isolate = new ivm.Isolate({ memoryLimit: 124 });
    const context = isolate.createContextSync();

    const jail = context.global;
    jail.setSync("global", jail.derefInto());

    const consoleCallback = function (...args: any) {
      console.log("1111", ...args);
    };

    context.evalClosureSync(
      `global.console.log = function(...args) {
      $0.applyIgnored(undefined, args, { arguments: { copy: true } });
    }`,
      [consoleCallback],
      { arguments: { reference: true } }
    );

    const script = isolate.compileScriptSync(`
        (async() => {
            try {
              ${code}
              const result = solution($input[0], input[1]);
              console.log(result)
              return result === output ? "성공" : "실패";
            } catch (err) {
                console.error(err)
            }
        })();
    `);

    const result = await script.runSync(context, { promise: true });
    console.log(result);

    res.status(200).send(`${result}`);
  } catch (e) {
    console.error(e);
  }
});

export default router;
