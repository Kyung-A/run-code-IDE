import { exec } from "child_process";

export const dockerRun = (command: string, cb: any) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      cb(error.message, null);
      return;
    }
    if (stderr) {
      cb(stderr, null);
      return;
    }

    cb(null, stdout);
  });
};
