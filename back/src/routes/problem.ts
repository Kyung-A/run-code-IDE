import express, { Application, Request, Response } from "express";
import ivm from "isolated-vm";
import fs from "fs";

const router = express.Router();

const test = fs
  .readFileSync("./src/mock/example.txt")
  .toString()
  .trim()
  .split("\n");
const input = test[0].split(" ").map(Number);
const output = Number(test[1]);

router.post("/", async (req: Request, res: Response) => {
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
              const result = solution(${input[0]}, ${input[1]});
              console.log(result)
              return result === ${output} ? "성공" : "실패";
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
