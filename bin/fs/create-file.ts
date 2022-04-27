import chalk from "chalk";

const fs = require("fs");
const fsPromise = fs.promises;

export const createFile = async (dir: string): Promise<void> => {
  try {
    await fsPromise.mkdir(dir, { recursive: true });
  } catch (err) {
    console.log(
      `${chalk.red("Failed while generating the folder structure")} `
    );
  }
};
