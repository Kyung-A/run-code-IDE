import { exec } from "child_process";
import fs from "fs";

import javascriptRun from "../compile/javascript";
import { problemTestcase } from "../mock/problem";

export const problemSocket = (io: any) => {
  const problem = io.of("/problem");

  problem.on("connection", (socket: any) => {
    console.log("connected");
    socket.room = "";

    socket.on("join", async (data: any) => {
      socket.room = data.room;
      const { id, code, lang } = data;

      let result: string[] = [];
      const testcase = problemTestcase.find((v) => v.id === id);

      switch (lang) {
        case "javascript":
          result = await javascriptRun(socket, code, testcase);
          break;
        case "python":
          fs.writeFileSync("code.py", code);
          testcase?.testcase.forEach((test) => {
            const input = test.input;
            const command = `docker run --rm -v %cd%:/dist python:3 python /dist/code.py ${input}`;

            exec(command, (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
              }

              const result = JSON.parse(stdout);

              if (result === test.output) {
                console.log("정답!");
              } else {
                console.log("오답!");
              }
            });
          });
          // fs.unlinkSync("code.py");
          break;
        default:
          return;
      }

      if (result.length > 0) {
        socket.emit("test", {
          testcase: result,
          result: result.some((v) => v === "false")
            ? "테스트에 통과하지 못 했습니다."
            : "테스트에 모두 성공했습니다.",
        });
      }
    });
  });
};
