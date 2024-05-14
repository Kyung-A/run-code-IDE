import fs from "fs";

import { problem } from "../mock/problem";
import { dockerRun } from "../helper/docker-run";
import { IData } from "./problem-socket";
import { cleanDirectory } from "../helper/clean-directory";
import { exec, execSync } from "child_process";
import { fileName, filePath } from "../consts";

interface IClientResult {
  input: string | null;
  output: any | null;
  result: any | null;
}

export const codeRun = (socket: any, data: IData) => {
  const { id, code, lang } = data;

  const testcase = problem.find((v) => v.id === id);
  const clientResult: IClientResult[] = Array.from(
    { length: testcase?.example.length as number },
    (_, i) => ({
      input: null,
      output: null,
      result: null,
    })
  );

  socket.emit("output", clientResult);
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
      testcase?.example.forEach((test, i) => {
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | node code.js"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
          return;
        });
      });
      break;

    case "python":
      testcase?.example.forEach((test, i) => {
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | python3 code.py"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
          return;
        });
      });
      break;

    case "java":
      testcase?.example.forEach((test, i) => {
        execSync(`docker exec test-app sh -c "javac Main.java"`);
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | java Main"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
          return;
        });
      });
      break;

    case "cpp":
      testcase?.example.forEach((test, i) => {
        execSync(`docker exec test-app sh -c "g++ -o main main.cpp"`);
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | ./main"`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            return;
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
          return;
        });
      });
      break;

    default:
      return;
  }

  cleanDirectory(filePath);
  return;
};
