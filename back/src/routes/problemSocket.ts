import { problemTestcase } from "../mock/problem";
import ivm from "isolated-vm";

export const problemSocket = (io: any) => {
  const problem = io.of("/problem");

  problem.on("connection", (socket: any) => {
    console.log("connected");
    socket.room = "";

    socket.on("join", async (data: any) => {
      socket.room = data.room;
      console.log(`${data.room} testcase start`);

      const id = data.id;
      const testcase = problemTestcase.find((v) => v.id === id);

      let arr = Array.from(
        { length: testcase?.testcase.length! },
        () => "Loading..."
      );

      const code = data.code;
      const isolate = new ivm.Isolate();
      const context = isolate.createContextSync();

      const jail = context.global;
      jail.setSync("global", jail.derefInto());

      const consoleCallback = function (...args: any) {
        socket.emit("error", ...args);
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

      if (testcase) {
        let i = 0;
        while (i < testcase.testcase.length) {
          const input = testcase.testcase[i].input;
          const output = testcase.testcase[i].output.result;
          let param = [];
          for (let j = 0; j < input.length; j++) {
            param.push(input[j]);
            param.push(",");
          }

          const script = isolate.compileScriptSync(`
          (async() => {
            try {
              ${code}
              let flag = true;
              const result = await solution(${param.join("").slice(0, -1)});

              if(result === ${output}) {
                flag = true;
              } else if(!result) {
                flag = false;
                } else {
                  flag = false;
                }
                return flag;
              } catch (err) {
                  console.log(String(err));
              }
          })();
        `);

          const result = await script
            .runSync(context, { promise: true })
            .catch((e) => console.log(e));

          if (!result) {
            arr[i] = "false";
            flag = false;
          } else {
            arr[i] = "true";
            flag = true;
          }
          i++;
        }
      }

      socket.emit("test", {
        testcase: arr,
        result: arr.some((v) => v === "false")
          ? "테스트에 통과하지 못 했습니다."
          : "테스트에 모두 성공했습니다.",
      });
    });
  });
};
