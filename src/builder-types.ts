import { ITemplates } from "./types";

export declare interface BuilderTemplate {
  global_path: string;
  templates: {
    [key: string]: ITemplates;
  };
}
