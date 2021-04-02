import * as fs from "fs";

export const getFiles = (path: fs.PathLike) => {
  let files: string[] = [];

  let directoryList = fs.readdirSync(path);

  directoryList.forEach((file) => {
    file = `${path}/${file}`;
    if (fs.lstatSync(file).isDirectory()) {
      files = files.concat(getFiles(file));
    }
    if (file.endsWith(".ts")) {
      files.push(file);
    }
  });

  return files;
};
