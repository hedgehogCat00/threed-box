import { EventEmitter } from '@angular/core';
import {
    Raycaster,
    Scene,
    PerspectiveCamera
} from 'three';
import { LayerCode } from '../entity';
import { findAncestorWhere } from '../utils/tools';

export class ProRayCasterController {
    raycaster: Raycaster = new Raycaster();
    onIntersected$ = new EventEmitter();
    intersectedObj: any;


    get changed() {
        return this._changed;
    }

    private _changed = false;
    constructor() { }

    checkIntersection(mousePos: { x: number, y: number }, scene: Scene, camera: PerspectiveCamera) {
        this.raycaster.setFromCamera(mousePos, camera);

        let intersects = this.raycaster.intersectObject(scene, true);
        intersects = this.filterOutTools(intersects);

        if (intersects.length > 0) {
            // 
            this._changed = this.intersectedObj !== intersects[0].object;
            if (this._changed) {
                this.intersectedObj = intersects[0].object;
                this.onIntersected$.emit(this.intersectedObj);
            }

        } else {
            this._changed = this.intersectedObj !== null;
            this.intersectedObj = null;
            if (this._changed) {
                this.onIntersected$.emit(null);
            }

        }
    }

    private filterOutTools(intersects: any[]) {
        const res = intersects.filter(item => {
            // 对辅助工具不检测
            const isMemberOfTool = Boolean(findAncestorWhere(item.object, _obj => _obj.layers?.isEnabled(LayerCode.TOOLS)));
            return !isMemberOfTool;
        })
        return res;
    }
}
