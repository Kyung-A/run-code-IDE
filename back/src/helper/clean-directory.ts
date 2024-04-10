import fs from "fs";

export const cleanDirectory = (path: string) => {
  fs.promises.readdir(path).then((dir) => {
    dir.forEach((file) => {
      fs.promises.unlink(`${path}/${file}`);
    });
  });
};
