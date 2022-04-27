const fs = require("fs");

export const templateExist = (fileName: string): number | string => {
  const fileSuffix = "template.js";
  const templateDirName = "templates";
  const rootPath = process.cwd();
  const rootDir = fs.readdirSync(rootPath);

  if (rootDir.find((dir: string) => dir === templateDirName)) {
    const templateDir = fs.readdirSync(`${rootPath}/${templateDirName}`);
    return templateDir.find((dir: string) =>
      dir === `${fileName}.${fileSuffix}` ? dir : 3
    );
  }
  return 2;
};
