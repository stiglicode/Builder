const fs = require("fs");

export const configFileExist = (): string | undefined => {
  const fileName = "builder.config";
  const fileSuffixes = ["js", "json"];
  const rootPath = process.cwd();
  const rootDir = fs.readdirSync(rootPath);

  return rootDir.find((file: string) =>
    fileSuffixes.find((fileSuffix) => file === `${fileName}.${fileSuffix}`)
  );
};
