import fs from "fs";
import path from "path";

export const ls = (directory, extension) => {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .filter((dirent) => extension.includes(path.extname(dirent.name)))
    .map((dirent) => path.parse(dirent.name).name);
};
