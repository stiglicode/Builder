import { BuilderTemplate } from "./builder-types";

export type IEntryConfigFiles = BuilderTemplate;

export interface ITemplates {
  path?: string;
  temp: string;
  use_global_path?: boolean | "true" | "false";
}

export interface IParsedTemplates extends ITemplates {
  name: string;
}

export interface ICreateFile {
  fileName: string;
  path: string;
  content: string;
}

type SuffixTypes =
  | "ts"
  | "tsx"
  | "js"
  | "jsx"
  | "css"
  | "scss"
  | "sass"
  | "less"
  | string;

export interface IAttributeErrors {
  tempName: string;
  message?: string;
}

export interface ITemplatePath {
  fileName: string;
}

export interface ITemplateFileStructure {
  target: string;
  content: string;
}

export interface ISubDirs {
  template: ITemplateFileStructure;
  path: string;
}

export type DividerType = ":";

export type FCValidation = () => boolean;
