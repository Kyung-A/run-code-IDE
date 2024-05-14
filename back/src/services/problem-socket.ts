import { Server } from "socket.io";

import { testcaseRun } from "./testcase-run";
import { codeRun } from "./code-run";
import { exec } from "child_process";

export interface IData {
  id: string;
  code: string;
  lang: string;
  room: string;
}

export const problemSocket = (io: Server) => {
  const problem = io.of("/problem");

  problem.on("connection", (socket: any) => {
    console.log("connected");
    socket.room = "";

    socket.on("codeRun", async (data: IData) => {
      socket.room = data.room;
      codeRun(socket, data);
    });

    socket.on("submit", async (data: IData) => {
      socket.room = data.room;
      testcaseRun(socket, data);
    });

    socket.on("disconnect", () => {
      // exec("docker stop test-app");
      // exec("docker rm test-app");
      console.log("disconnect");
    });
  });
};
