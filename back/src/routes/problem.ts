import express, { Request, Response } from "express";
import { problemList, problem, problemTestcase } from "../mock/problem";
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

router.post("/:problemId", async (req: Request, res: Response) => {
  try {
    const id = req.params.problemId;
    const problem = problemTestcase.find((v) => v.id === id);

    const { code } = req.body;
    const isolate = new ivm.Isolate({ memoryLimit: 124 });
    const context = isolate.createContextSync();

    const jail = context.global;
    jail.setSync("global", jail.derefInto());

    const consoleCallback = function (...args: any) {
      console.log(...args);
    };

    context.evalClosureSync(
      `global.console.log = function(...args) {
      $0.applyIgnored(undefined, args, { arguments: { copy: true } });
    }`,
      [consoleCallback],
      { arguments: { reference: true } }
    );

    let flag = true;
    if (problem) {
      let i = 0;
      while (i < problem.testcase.length) {
        const input = problem.testcase[i].input;
        const output = problem.testcase[i].output.result;

        const script = isolate.compileScriptSync(`
          (async() => {
              try {
                ${code}
                let flag = true;
                const result = solution(${input[0]}, ${input[1]});
                if(result === ${output}) {
                  flag = true;
                } else if(!result) {
                  flag = false;
                } else {
                  flag = false;
                }
                return flag;
              } catch (err) {
                  console.error(err)
              }
          })();
        `);
        const result = await script
          .runSync(context, { promise: true })
          .catch((e) => console.error(e));

        if (!result) {
          flag = false;
          break;
        } else {
          flag = true;
        }
        i++;
      }
    }

    res.status(200).send(`${flag ? "성공했습니다!" : "실패했습니다."}`);
  } catch (e) {
    console.error(e);
  }
});

export default router;
