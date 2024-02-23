import express, { Application, Request, Response } from "express";
import ivm from "isolated-vm";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    // const { code: testCode, lang } = req.body;
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

    const solutionCallback = function (...args: any) {
      return "abc";
    };

    context.evalClosureSync(
      `global.test = function(...args) {
            return $0.applySync(undefined, args, { arguments: { copy: true }, result: { promise: true } });
        }`,
      [solutionCallback],
      { arguments: { reference: true } }
    );

    const script = isolate.compileScriptSync(`
        (async() => {
            try {
                return await test();
            }catch (err) {
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
