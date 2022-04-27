import { CorrectFormat, WrongCommandFormat } from "../messages";

export const cliCommand = (): string | undefined => {
  const command = process.argv.slice(2)[0];

  if (!command.includes(":")) {
    console.error(`${WrongCommandFormat} ${CorrectFormat}`);
    return undefined;
  }
  return command;
};
