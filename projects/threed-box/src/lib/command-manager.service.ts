import { Injectable } from '@angular/core';
import { ICommand } from './command/entity';

@Injectable()
export class CommandManagerService implements ICommand {
  private commands: ICommand[] = [];
  constructor() { }

  exec(cmd: ICommand, value: any) {
    cmd.exec(value);
    this.commands.push(cmd);
  }

  undo() {
    const cmd = this.commands.pop();
    cmd?.undo();
  }
}
