#!/usr/bin/env node

import { cliCommand } from "./initilization/prompt";
import { DividerType } from "./types";
import { configFileExist } from "./validation/config-file";
import { templateExist } from "./validation/template-file";

class __Main__ {
  private readonly cliCommand: string | undefined;
  private readonly divider: DividerType;

  constructor() {
    this.divider = ":";
    this.cliCommand = cliCommand();
    this.run();
  }

  private validate = (): boolean => {
    console.log(configFileExist());
    console.log(templateExist("other"));
    return true;
  };

  private run = () => {
    if (!this.cliCommand) return;
    this.validate();
    console.log(this.divider);
    console.log(this.cliCommand);
  };
}

new __Main__();
