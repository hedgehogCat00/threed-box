export abstract class ObjectState {
    constructor() {

    }

    static createFrom(obj: THREE.Object3D) {

    }
}

export class MeshState extends ObjectState {
    type = 'mesh-state';
    constructor(private obj: THREE.Mesh) {
        super();
    }

}

export class GroupState extends ObjectState {
    constructor(private obj: THREE.Mesh) {
        super();
    }

}