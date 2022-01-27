import { ICommand } from "projects/threed-box/src/lib/command/entity";
import { Object3D } from 'three';

export class SetEulerCommand implements ICommand {
    private oriEulerVal: any;
    private _val: any;
    constructor(private state: any, private obj: Object3D, val: any) {
        this.oriEulerVal = { x: obj.rotation.x, y: obj.rotation.y, z: obj.rotation.z };
        this._val = Object.assign({}, val);
    }

    exec() {
        ['x', 'y', 'z'].forEach(k => {
            // 当前状态赋值
            this.state.rotation[k] = this._val[k];
        });
        // 同步到物体
        this.obj.rotation.set(this._val.x, this._val.y, this._val.z);
    }

    undo() {
        ['x', 'y', 'z'].forEach(k => {
            // 当前状态赋值
            this.state.rotation[k] = this.oriEulerVal[k];
        });
        // 同步到物体
        this.obj.rotation.set(this.oriEulerVal.x, this.oriEulerVal.y, this.oriEulerVal.z);
    }
}