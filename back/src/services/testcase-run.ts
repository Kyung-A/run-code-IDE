import fs from "fs";

import { problemTestcase } from "../mock/problem";
import { dockerRun } from "../helper/docker-run";
import { IData } from "./problem-socket";
import { cleanDirectory } from "../helper/clean-directory";
import { fileName, filePath } from "../consts";
import { execSync } from "child_process";

interface IClientResult {
  index: number;
  output: any;
}

export const testcaseRun = (socket: any, data: IData) => {
  const { id, code, lang } = data;

  const testcase = problemTestcase.find((v) => v.id === id);
  const clientResult: IClientResult[] = Array.from(
    { length: testcase?.testcase.length as number },
    (_, i) => ({
      index: i + 1,
      output: null,
    })
  );
  socket.emit("test", clientResult);
  fs.writeFileSync(`${filePath}/${fileName[lang]}`, code);
  try {
    execSync(`docker cp compile/. test-app:/usr/src`);
  } catch (err) {
    console.error(err);
    socket.emit("error", "not compile");
    return;
  }

  switch (lang) {
    case "javascript":
      testcase?.testcase.forEach((test, i) => {
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | node code.js"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          if (res.trim() === test.output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
            return;
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
            return;
          }
        });
      });
      break;

    case "python":
      testcase?.testcase.forEach((test, i) => {
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | python3 code.py"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          const output =
            typeof test.output === "string" && test.output.includes("\\n")
              ? test.output.split("\\n").join("\n")
              : test.output;

          if (res.trim() === output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
            return;
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
            return;
          }
        });
      });
      break;

    case "java":
      testcase?.testcase.forEach((test, i) => {
        execSync(`docker exec test-app sh -c "javac Main.java"`);
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | java Main"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          if (res.trim() === test.output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
            return;
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
            return;
          }
        });
      });
      break;

    case "cpp":
      testcase?.testcase.forEach((test, i) => {
        execSync(`docker exec test-app sh -c "g++ -o main main.cpp"`);
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | ./main"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          if (res.trim() === test.output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
            return;
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
            return;
          }
        });
      });
      break;

    default:
      return;
  }

  cleanDirectory(filePath);
  return;
};
