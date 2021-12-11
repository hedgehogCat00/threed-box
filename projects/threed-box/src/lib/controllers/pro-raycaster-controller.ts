import { EventEmitter } from '@angular/core';
import {
    Raycaster,
    Scene,
    PerspectiveCamera
} from 'three';

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

        const intersects = this.raycaster.intersectObject(scene, true);

        if (intersects.length > 0) {
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
}