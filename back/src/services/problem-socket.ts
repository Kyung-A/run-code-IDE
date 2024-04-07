import fs from "fs";

import { problemTestcase } from "../mock/problem";
import { dockerBuild } from "../helper/docker-build";
import { dockerRun } from "../helper/docker-run";

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
      const filePath = "dist";

      switch (lang) {
        case "javascript":
          fs.writeFileSync(`${filePath}/code.js`, code);
          dockerBuild(lang);

          testcase?.testcase.forEach((test, i) => {
            clientResult[i] = null;
            const command = `echo ${test.input} | docker run --rm -i node:16`;

            dockerRun(command, (err: string, res: any) => {
              if (err) {
                socket.emit("error", err);
                process.exit();
              }

              const result = JSON.parse(res);
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

        case "python":
          fs.writeFileSync(`${filePath}/code.py`, code);
          dockerBuild(lang);

          testcase?.testcase.forEach((test, i) => {
            clientResult[i] = null;
            const command = `echo ${test.input} | docker run --rm -i python:3`;

            dockerRun(command, (err: string, res: any) => {
              if (err) {
                socket.emit("error", err);
                process.exit();
              }

              const result = JSON.parse(res);
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

        case "java":
          fs.writeFileSync(`${filePath}/Main.java`, code);
          dockerBuild(lang);

          testcase?.testcase.forEach((test, i) => {
            clientResult[i] = null;
            const command = `echo ${test.input} | docker run --rm -i openjdk:11`;

            dockerRun(command, (err: string, res: any) => {
              if (err) {
                socket.emit("error", err);
                process.exit();
              }

              const result = JSON.parse(res);
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

        case "cpp":
          fs.writeFileSync(`${filePath}/main.cpp`, code);
          dockerBuild(lang);

          testcase?.testcase.forEach((test, i) => {
            clientResult[i] = null;
            const command = `echo ${test.input} | docker run --rm -i cpp:latest`;

            dockerRun(command, (err: string, res: any) => {
              if (err) {
                socket.emit("error", err);
                process.exit();
              }

              const result = JSON.parse(res);
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
    });
  });
};
