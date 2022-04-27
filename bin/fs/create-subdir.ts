import { ISubDirs } from "../types";
import { createFolder } from "./create-folder";

export const createSubDir = async ({ template, path }: ISubDirs) => {
  const subDirs = template.target.split("/");
  if (subDirs.length > 1) {
    const subDir = subDirs.slice(0, -1).toString().replace(",", "/");
    await createFolder(`${process.cwd()}${path}${subDir}`);
  }
};
