#!/usr/bin/env node

import type { ICreateFile, IEntryConfigFiles } from "./types";
import {
  IAttributeErrors,
  IParsedTemplates,
  ISubDirs,
  ITemplateFileStructure,
  ITemplatePath,
} from "./types";

const { createSpinner } = require("nanospinner");
const chalk = require("chalk");
const fs = require("fs");
const fsPromise = fs.promises;

// Todo: Osetrit scenar ak bude komponent uz existovat
// Todo: Pridat globap_path ak path existuje

class __Main__ {
  private componentName: string;
  private readonly components: IParsedTemplates[];
  private readonly config: IEntryConfigFiles;
  private readonly templatePath: ({ fileName }: ITemplatePath) => string;
  private readonly variable: string;

  constructor() {
    this.variable = "$[component]$";
    this.templatePath = ({ fileName }) => {
      return `${process.cwd()}/templates/${fileName}.template.js`;
    };
    this.componentName = "";
    this.components = [];
    this.config = this.LoadConfigFile();
    this.init();
    this.run()
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        console.error("Something went wrong");
      });
  }

  private init = (): void => {
    Object.entries(this.config.templates).map(([property, value]) => {
      this.components.push({
        name: property,
        ...value,
      });
    });
  };

  private validateTemplates = (): boolean => {
    const isMissingTemp = this.components.find((component) => !component.temp);
    if (isMissingTemp) {
      this.handleAttributeError({ tempName: isMissingTemp.name });
      return false;
    }
    return true;
  };

  private existComponent = (): IParsedTemplates | undefined => {
    const prompt: string = this.initPrompt();

    if (!prompt.includes(":")) {
      throw new Error("Script doesn't have correct format");
    } else {
      const script: string[] = prompt.split(":");
      const component = this.components.find((c) => c.name === script[0]);

      if (component) {
        this.componentName = script[1];
        return component;
      }
      return undefined;
    }
  };

  private initPrompt = (): string => {
    return process.argv.slice(2)[0];
  };

  private LoadConfigFile = (): IEntryConfigFiles => {
    try {
      return require(`${process.cwd()}/builder.config.js`);
    } catch (er) {
      throw new Error("Config file doesn't exist!");
    } finally {
      console.log("Config file was loaded successfuly");
    }
  };

  private handleAttributeError = ({
    tempName,
    message,
  }: IAttributeErrors): void => {
    console.error(
      `${chalk.redBright("Error | ")}Template '${chalk.cyan.italic(
        tempName
      )}' is missing attribute ${chalk.cyan.italic("temp")}${
        message ? " " + message : ""
      }!`
    );
  };

  private createFolder = async (dir: string) => {
    try {
      await fsPromise.mkdir(dir, { recursive: true });
      return true;
    } catch (err) {
      console.log(
        `${chalk.red("Failed while generating the folder structure")} `
      );
      return err;
    }
  };

  private createFile = async ({ fileName, path, content }: ICreateFile) => {
    const spinner = createSpinner(
      `Generating - ${chalk.cyanBright(fileName)}`
    ).start();
    try {
      await fsPromise.writeFile(`${process.cwd()}${path}${fileName}`, content);
      return spinner.success({
        text: `File: ${chalk.cyan(`.${path}${fileName}`)} was generated.`,
      });
    } catch (err) {
      console.log(err);
      return spinner.error({
        text: `${chalk.red("Failed while generating the file")} - ${fileName}`,
      });
    } finally {
      spinner.clear();
    }
  };

  private loadTemplateFiles = (): ITemplateFileStructure[] | undefined => {
    const component = this.existComponent();
    const templateName = component?.temp;
    try {
      const templateFile = require(this.templatePath({
        fileName: templateName || "",
      }));
      const templates = Object.entries<string>(
        templateFile
      ).map<ITemplateFileStructure>(([key, value]) => ({
        target: key,
        content: value,
      }));
      return templates.map((template) => ({
        target: template.target.replace(this.variable, this.componentName),
        content: template.content.split(this.variable).join(this.componentName),
      }));
    } catch (err) {
      console.log(
        `${chalk.redBright("Error |")} Cannot find file - ${chalk.cyan.italic(
          this.templatePath({
            fileName: templateName || "",
          })
        )}`
      );
    }
    return;
  };
  private createSubDir = async ({ template, path }: ISubDirs) => {
    const subDirs = template.target.split("/");
    if (subDirs.length > 1) {
      const subDir = subDirs.slice(0, -1).toString().replace(",", "/");
      await this.createFolder(`${process.cwd()}${path}${subDir}`);
    }
  };

  private run = async (): Promise<void> => {
    if (!this.validateTemplates()) return;
    const component = this.existComponent();
    const templates = this.loadTemplateFiles();
    if (!templates) return;

    const correctPath = `${
      component?.path ? component.path || "/" : this.config.global_path
    }`;

    await this.createFolder(`${process.cwd()}${correctPath}`);
    templates.map(async (template) => {
      await this.createSubDir({
        template: template,
        path: correctPath,
      });
      await this.createFile({
        fileName: template.target,
        path: correctPath,
        content: template.content,
      });
    });
  };
}

new __Main__();
