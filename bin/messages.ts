import chalk from "chalk";
import { ErrorMessage } from "./helpers/error-message";

export const CorrectFormat = `Correct format is ${chalk.cyanBright?.italic(
  "'template_name:component_name'"
)}`;

export const WrongCommandFormat = ErrorMessage(
  "Script doesn't have correct format!"
);

export const TemplateFolderDoesntExists = ErrorMessage(
  "Template folder doesn't exists! For correct usage, please create template folder"
);
