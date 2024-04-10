import fs from "fs";

import { problem } from "../mock/problem";
import { dockerBuild } from "../helper/docker-build";
import { dockerRun } from "../helper/docker-run";
import { IData } from "./problem-socket";

interface IClientResult {
  input: string | null;
  output: any | null;
  result: any | null;
}

// TODO: 리팩토링 필요
export const codeRun = (socket: any, data: IData) => {
  const { id, code, lang } = data;

  const testcase = problem.find((v) => v.id === id);
  const filePath = "dist";
  const clientResult: IClientResult[] = Array.from(
    { length: testcase?.example.length as number },
    (_, i) => ({
      input: null,
      output: null,
      result: null,
    })
  );
  socket.emit("output", clientResult);

  switch (lang) {
    case "javascript":
      fs.writeFileSync(`${filePath}/code.js`, code);
      dockerBuild(lang);

      testcase?.example.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i node:16`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
        });
      });
      break;

    case "python":
      fs.writeFileSync(`${filePath}/code.py`, code);
      dockerBuild(lang);

      testcase?.example.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i python:3`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
        });
      });
      break;

    case "java":
      fs.writeFileSync(`${filePath}/Main.java`, code);
      dockerBuild(lang);

      testcase?.example.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i openjdk:11`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
        });
      });
      break;

    case "cpp":
      fs.writeFileSync(`${filePath}/main.cpp`, code);
      dockerBuild(lang);

      testcase?.example.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i cpp:latest`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          const result = typeof res === "object" ? JSON.parse(res) : res;
          clientResult[i] = { ...test, result };
          socket.emit("output", clientResult);
        });
      });
      break;

    default:
      return;
  }
};
