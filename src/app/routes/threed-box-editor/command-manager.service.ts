import { Injectable } from '@angular/core';
import { ICommand } from './commands/entity';

@Injectable()
export class CommandManagerService implements ICommand {
  private commands: ICommand[] = [];
  historyLen = 20;

  get canUndo(): boolean {
    return this.commands.length > 0;
  }

  constructor() { }

  exec(cmd: ICommand, value: any) {
    cmd.exec(value);
    this.commands.push(cmd);

    if (this.commands.length > this.historyLen) {
      this.commands.shift();
    }
  }

  undo() {
    const cmd = this.commands.pop();
    cmd?.undo();
  }
}
