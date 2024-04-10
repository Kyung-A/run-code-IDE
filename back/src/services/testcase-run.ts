import fs from "fs";

import { problemTestcase } from "../mock/problem";
import { dockerBuild } from "../helper/docker-build";
import { dockerRun } from "../helper/docker-run";
import { IData } from "./problem-socket";
import { cleanDirectory } from "../helper/clean-directory";

interface IClientResult {
  index: number;
  output: any;
}

// TODO: 리팩토링 필요
export const testcaseRun = (socket: any, data: IData) => {
  const { id, code, lang } = data;

  const testcase = problemTestcase.find((v) => v.id === id);
  const filePath = "compile";
  const clientResult: IClientResult[] = Array.from(
    { length: testcase?.testcase.length as number },
    (_, i) => ({
      index: i + 1,
      output: null,
    })
  );
  socket.emit("test", clientResult);

  switch (lang) {
    case "javascript":
      fs.writeFileSync(`${filePath}/code.js`, code);
      dockerBuild(lang);

      testcase?.testcase.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i node:16`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          if (res.trim() === test.output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
          }
        });
      });
      break;

    case "python":
      fs.writeFileSync(`${filePath}/code.py`, code);
      dockerBuild(lang);

      testcase?.testcase.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i python:3`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          if (res.trim() === test.output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
          }
        });
      });
      break;

    case "java":
      fs.writeFileSync(`${filePath}/Main.java`, code);
      dockerBuild(lang);

      testcase?.testcase.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i openjdk:11`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          if (res.trim() === test.output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
          }
        });
      });
      break;

    case "cpp":
      fs.writeFileSync(`${filePath}/main.cpp`, code);
      dockerBuild(lang);

      testcase?.testcase.forEach((test, i) => {
        const command = `echo ${test.input} | docker run --rm -i cpp:latest`;

        dockerRun(command, (err: string, res: any) => {
          if (err) {
            socket.emit("error", err);
            process.exit();
          }

          if (res.trim() === test.output) {
            clientResult[i] = { index: i + 1, output: true };
            socket.emit("test", clientResult);
          } else {
            clientResult[i] = { index: i + 1, output: false };
            socket.emit("test", clientResult);
          }
        });
      });
      break;

    default:
      return;
  }

  cleanDirectory(filePath);
};
