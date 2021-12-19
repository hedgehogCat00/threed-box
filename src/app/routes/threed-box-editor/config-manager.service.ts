import { Injectable } from '@angular/core';
import { deepCopy } from '@delon/util';
import { IConfig } from './entity';

@Injectable()
export class ConfigManagerService {
  private config: IConfig = {
    objects: {}
  };
  constructor() { }

  recordObjState(obj: THREE.Object3D) {
    const id = obj.id;
    const objects = this.config.objects;
    if (!objects[id]) {
      objects[id] = {
        states: []
      }
    }
    objects[id].states = deepCopy(obj.userData.states);
  }

  export(scene: THREE.Scene) {
    // 记录物体状态
    scene.traverse(obj => {
      if (obj.userData.states) {
        this.recordObjState(obj);
      }
    });

    // 使用拷贝
    const data: IConfig = JSON.parse(JSON.stringify(this.config));

    // // 将 uuid 转化成 name 或者 path
    // const objects = data.objects;
    // const tmpObjects: any = {};
    // Object.keys(objects)
    //   .forEach((key) => {
    //     const id = Number(key);
    //     const obj = scene.getObjectById(id);
    //     if (!obj) {
    //       console.error('object not found: ', id);
    //       return;
    //     }

    //     // 有 name 则使用 name
    //     if (obj.name) {
    //       tmpObjects[`name:${obj.name}`] = objects[id];
    //     } else {
    //       // 否则使用 path
    //       const path = this.getPathOfObj(obj);
    //       tmpObjects[`path:${path}`] = objects[id];
    //     }
    //   });

    // data.objects = tmpObjects;
    console.log('config to export', data);
    return data;
  }

  private getPathOfObj(obj: THREE.Object3D) {
    const pathArr = [];
    let curr = obj;
    while (curr.parent) {
      const p = curr.parent;
      const idx = p.children.findIndex(c => c.id === curr.id);
      pathArr.unshift(`children[${idx}]`);
      curr = curr.parent;
    }
    return pathArr.join('.');
  }
}
