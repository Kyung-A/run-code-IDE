import fs from "fs";

import { problem } from "../mock/problem";
import { dockerBuild } from "../helper/docker-build";
import { dockerRun } from "../helper/docker-run";
import { IData } from "./problem-socket";
import { cleanDirectory } from "../helper/clean-directory";
import { exec, execSync } from "child_process";

interface IClientResult {
  input: string | null;
  output: any | null;
  result: any | null;
}

interface IProps {
  [key: string]: string;
}

// TODO: 리팩토링 필요
export const codeRun = (socket: any, data: IData) => {
  const { id, code, lang } = data;

  const testcase = problem.find((v) => v.id === id);
  const filePath = "compile";
  const fileName: IProps = {
    javascript: "code.js",
    python: "code.py",
    java: "Main.java",
    cpp: "main.cpp",
  };
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
  // execSync(`docker run -d -it --name test-app myimage:latest`);
  execSync(`docker cp compile/. test-app:/usr/src`);

  switch (lang) {
    case "javascript":
      testcase?.example.forEach((test, i) => {
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | node code.js"`;

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
      testcase?.example.forEach((test, i) => {
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | python3 code.py"`;

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
      testcase?.example.forEach((test, i) => {
        execSync(`docker exec test-app sh -c "javac Main.java"`);
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | java Main"`;

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
      testcase?.example.forEach((test, i) => {
        execSync(`docker exec test-app sh -c "g++ -o main main.cpp"`);
        const command = `docker exec test-app sh -c "echo -e '${test.input}' | ./main"`;

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

  // exec("docker stop test-app");
  // exec("docker rm test-app");
  // cleanDirectory(filePath);
};
