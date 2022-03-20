import { ICommand } from "./entity";
import { Group, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Scene } from 'three';
import { State } from '../entity';


abstract class StateCommand {
    constructor() {

    }

    protected genStateValues(obj: any) {
        if (obj instanceof Group) {
            return this.genGroupStateValues(obj);
        } else if (obj instanceof Scene) {
            return this.genSceneStateValues(obj);
        } else if (obj instanceof Mesh) {
            return this.genMeshStateValues(obj);
        }
    }

    protected genSceneStateValues(obj: THREE.Scene) {
        const keys = [
            'background',
            'environment',
            'fog'
        ];
        return this.genObjStateValues(obj, keys);
    }

    protected genGroupStateValues(obj: THREE.Group) {
        const keys = [
            'position',
            'rotation',
            'scale'
        ];
        return this.genObjStateValues(obj, keys);
    }

    protected genMeshStateValues(obj: THREE.Mesh) {
        const keys = [
            'position',
            'rotation',
            'scale',
            'material',
            'visible',
            'castShadow',
            'receiveShadow'
        ];
        return this.genObjStateValues(obj, keys);
    }

    protected genMatStateValues(mat: THREE.Material | THREE.Material[]): any {
        if (Array.isArray(mat)) {
            return mat.map(this.genMatStateValues);
        }
        const keys = [
            'fog',
            'opacity',
            'transparent',
            'polygonOffset',
            'polygonOffsetFactor',
            'polygonOffsetUnits',
            'visible'
        ];
        if (mat instanceof MeshBasicMaterial) {
            keys.push(...[
                'alphaMap',
                'aoMap',
                'aoMapIntensity',
                'color',
                'envMap',
                'map',
                'reflectivity',
                'refractionRatio',
                'specularMap',
                'wireframe',
                'wireframeLinecap',
                'wireframeLinejoin',
                'wireframeLinewidth'
            ]);
        } else if (mat instanceof MeshLambertMaterial) {
            keys.push(...[
                'alphaMap',
                'aoMap',
                'aoMapIntensity',
                'color',
                'emissive',
                'emissiveMap',
                'emissiveIntensity',
                'envMap',
                'map',
                'reflectivity',
                'refractionRatio',
                'specularMap',
                'wireframe',
                'wireframeLinecap',
                'wireframeLinejoin',
                'wireframeLinewidth'
            ]);
        } else if (mat instanceof MeshStandardMaterial) {
            keys.push(...[
                'alphaMap',
                'aoMap',
                'aoMapIntensity',
                'bumpMap',
                'bumpScale',
                'color',
                'displacementMap',
                'displacementScale',
                'displacementBias',
                'emissive',
                'emissiveMap',
                'emissiveIntensity',
                'envMap',
                'envMapIntensity',
                'flatShading',
                'map',
                'metalness',
                'metalnessMap',
                'normalMap',
                'normalMapType',
                'normalScale',
                'refractionRatio',
                'roughness',
                'wireframe',
                'wireframeLinecap',
                'wireframeLinejoin',
                'wireframeLinewidth'
            ]);
        } else if (mat instanceof MeshPhongMaterial) {
            keys.push(...[
                'alphaMap',
                'aoMap',
                'aoMapIntensity',
                'bumpMap',
                'bumpScale',
                'color',
                'displacementMap',
                'displacementScale',
                'displacementBias',
                'emissive',
                'emissiveMap',
                'emissiveIntensity',
                'envMap',
                'envMapIntensity',
                'flatShading',
                'map',
                'normalMap',
                'normalMapType',
                'normalScale',
                'reflectivity',
                'refractionRatio',
                'shininess',
                'specular',
                'specularMap',
                'wireframe',
                'wireframeLinecap',
                'wireframeLinejoin',
                'wireframeLinewidth'
            ]);
        } else if (mat instanceof MeshPhysicalMaterial) {
            keys.push(...[
                'alphaMap',
                'aoMap',
                'aoMapIntensity',
                'bumpMap',
                'bumpScale',
                'color',
                'displacementMap',
                'displacementScale',
                'displacementBias',
                'emissive',
                'emissiveMap',
                'emissiveIntensity',
                'envMap',
                'envMapIntensity',
                'flatShading',
                'map',
                'metalness',
                'metalnessMap',
                'normalMap',
                'normalMapType',
                'normalScale',
                'refractionRatio',
                'roughness',
                'wireframe',
                'wireframeLinecap',
                'wireframeLinejoin',
                'wireframeLinewidth',
                'clearcoat',
                'clearcoatMap',
                'clearcoatNormalMap',
                'clearcoatNormalScale',
                'clearcoatRoughness',
                'clearcoatRoughnessMap',
                'ior',
                'reflectivity',
                'sheen',
                'sheenRoughness',
                'sheenRoughnessMap',
                'sheenColor',
                'sheenColorMap',
                'transmission',
                'transmissionMap'
            ]);
        }
        return this.genObjStateValues(mat, keys);
    }

    protected genObjStateValues(obj: any, keys: string[]) {
        return keys.reduce((res: any, key) => {
            const rawValType = typeof obj[key];
            if (rawValType === 'number' || rawValType === 'boolean' || rawValType === 'string') {
                res[key] = obj[key];
            } else if (key === 'material') {
                res[key] = this.genMatStateValues(obj[key]);
            } else if (obj[key]) {
                res[key] = obj[key].clone();
            }
            return res;
        }, {});
    }
}

export class AddStateCommand extends StateCommand implements ICommand {
    private objStatesSnapshot: any;
    constructor(
        private obj: THREE.Object3D,
        private state: Partial<State>
    ) {
        super();
        this.objStatesSnapshot = JSON.parse(JSON.stringify(obj.userData.states));
    }

    exec() {
        const obj = this.obj;
        const state = this.state;
        if (!obj.userData.states) {
            obj.userData.states = [];
        }

        const states = obj.userData.states;
        if (states.some((s: State) => s.id === state.id)) {
            console.error(`State ${state.name} already exists!`);
            return;
        }

        // TODO 根据 obj 类型筛选对应属性，而非所有都拷贝一遍
        // const clonedObj = obj.clone(true);
        // clonedObj.clear();
        // clonedObj.userData = {};
        const clonedValues = this.genStateValues(obj);
        const clone = Object.assign({}, state, { values: clonedValues });
        states.push(clone);
    }

    undo() {
        this.obj.userData.states = JSON.parse(JSON.stringify(this.objStatesSnapshot));
    }
}

export class RemoveStateCommand extends StateCommand implements ICommand {
    private objStatesSnapshot: any;
    constructor(
        private obj: THREE.Object3D,
        private state: Partial<State>
    ) {
        super();
        this.objStatesSnapshot = JSON.parse(JSON.stringify(obj.userData.states));
    }

    exec() {
        const obj = this.obj;
        const state = this.state;
        const states = obj.userData.states;
        const idx = states.findIndex((s: State) => s.id === state.id);
        if (idx > -1) {
            const targetState = states.splice(idx, 1);
            // TODO 递归释放资源
        }
    }

    undo() {
        this.obj.userData.states = JSON.parse(JSON.stringify(this.objStatesSnapshot));
    }
}

export class SetStateCommand extends StateCommand implements ICommand {
    private objStatesSnapshot: any;
    constructor(
        private obj: THREE.Object3D,
        private state: Partial<State>
    ) {
        super();
        this.objStatesSnapshot = JSON.parse(JSON.stringify(obj.userData.states));
    }

    exec() {

    }

    undo() {
        this.obj.userData.states = JSON.parse(JSON.stringify(this.objStatesSnapshot));
    }
}