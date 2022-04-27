import chalk from "chalk";

export const ErrorMessage = (message: string): string => {
  return `${chalk.redBright("Error: ")}${chalk.red.italic(message)}`;
};
