import { ICommand } from "projects/threed-box/src/lib/command/entity";
import { Object3D } from 'three';

export class SetVec3Command implements ICommand {
    protected oriVal: any;
    protected _val: any;
    constructor(private state: any, private obj: any, private propKey: string, val: any) {
        const prop = obj[this.propKey];
        this.oriVal = { x: prop.x, y: prop.y, z: prop.z };
        this._val = Object.assign({}, val);
    }

    exec() {
        ['x', 'y', 'z'].forEach(k => {
            // 当前状态赋值
            this.state[this.propKey][k] = this._val[k];
        });
        // 同步到物体
        this.obj[this.propKey].set(this._val.x, this._val.y, this._val.z);
    }

    undo() {
        ['x', 'y', 'z'].forEach(k => {
            // 当前状态赋值
            this.state[this.propKey][k] = this.oriVal[k];
        });
        // 同步到物体
        this.obj[this.propKey].set(this.oriVal.x, this.oriVal.y, this.oriVal.z);
    }
}

// export class SetEulerCommand implements ICommand {
//     private oriEulerVal: any;
//     private _val: any;
//     constructor(private state: any, private obj: Object3D, val: any) {
//         this.oriEulerVal = { x: obj.rotation.x, y: obj.rotation.y, z: obj.rotation.z };
//         this._val = Object.assign({}, val);
//     }

//     exec() {
//         ['x', 'y', 'z'].forEach(k => {
//             // 当前状态赋值
//             this.state.rotation[k] = this._val[k];
//         });
//         // 同步到物体
//         this.obj.rotation.set(this._val.x, this._val.y, this._val.z);
//     }

//     undo() {
//         ['x', 'y', 'z'].forEach(k => {
//             // 当前状态赋值
//             this.state.rotation[k] = this.oriEulerVal[k];
//         });
//         // 同步到物体
//         this.obj.rotation.set(this.oriEulerVal.x, this.oriEulerVal.y, this.oriEulerVal.z);
//     }
// }

// export class SetPosCommand implements ICommand {
//     private oriPosVal: any;
//     private _val: any;
//     constructor(private state: any, private obj: Object3D, val: any) {
//         this.oriPosVal = { x: obj.position.x, y: obj.position.y, z: obj.position.z };
//         this._val = Object.assign({}, val);
//     }

//     exec() {
//         ['x', 'y', 'z'].forEach(k => {
//             // 当前状态赋值
//             this.state.position[k] = this._val[k];
//         });
//         // 同步到物体
//         this.obj.position.set(this._val.x, this._val.y, this._val.z);
//     }

//     undo() {
//         ['x', 'y', 'z'].forEach(k => {
//             // 当前状态赋值
//             this.state.position[k] = this.oriPosVal[k];
//         });
//         // 同步到物体
//         this.obj.position.set(this.oriPosVal.x, this.oriPosVal.y, this.oriPosVal.z);
//     }
// }