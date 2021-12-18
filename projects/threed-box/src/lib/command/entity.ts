export interface ICommand {
    exec(...[]: any[]): any;
    undo(...[]: any[]): any;
}