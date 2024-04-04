import { exec, execSync } from "child_process";
import fs from "fs";

import { problemTestcase } from "../mock/problem";

export const problemSocket = (io: any) => {
  const problem = io.of("/problem");

  problem.on("connection", (socket: any) => {
    console.log("connected");
    socket.room = "";

    socket.on("join", async (data: any) => {
      socket.room = data.room;
      const { id, code, lang } = data;
      const testcase = problemTestcase.find((v) => v.id === id);
      let clientResult: { [key: string]: boolean | null } = {};

      switch (lang) {
        case "javascript":
          fs.writeFileSync("code.js", code);

          testcase?.testcase.forEach((test, i) => {
            clientResult[i] = null;
            const input = test.input;
            fs.writeFileSync("input.txt", input as string);
            const command = `docker run --rm -v %cd%:/dist node:latest node /dist/code.js /dist/input.txt`;

            try {
              const result = execSync(command);
              const value = JSON.parse(result.toString());

              if (value === test.output) {
                clientResult[i] = true;
                socket.emit("test", clientResult);
              } else {
                clientResult[i] = false;
                socket.emit("test", clientResult);
              }
            } catch (error) {
              console.error(`Error: ${(error as any).message}`);
              socket.emit(
                "error",
                (error as any).message.split("SyntaxError:")[1].split("at")[0]
              );
            }
          });
          break;
        case "python":
          fs.writeFileSync("code.py", code);
          testcase?.testcase.forEach((test, i) => {
            clientResult[i] = null;
            const input = test.input;
            const command = `docker run --rm -v %cd%:/dist python:3 python /dist/code.py ${input}`;

            exec(command, (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error.message}`);
                socket.emit("error", error.message);
                return;
              }
              if (stderr) {
                console.error(`Error: ${stderr}`);
                socket.emit("error", stderr);
                return;
              }

              const result = JSON.parse(stdout);

              if (result === test.output) {
                clientResult[i] = true;
                socket.emit("test", clientResult);
              } else {
                clientResult[i] = false;
                socket.emit("test", clientResult);
              }
            });
          });
          break;
        default:
          return;
      }
      // fs.unlinkSync("code.py");
      // fs.unlinkSync("code.js");
      // fs.unlinkSync("input.txt");
    });
  });
};
