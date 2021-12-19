import { State } from 'projects/threed-box/src/lib/entity';
import { StateService } from 'projects/threed-box/src/lib/state.service';
import { ICommand } from './entity';

abstract class StateCommand {
    protected objStatesSnapshot: any;
    constructor(
        protected obj: THREE.Object3D,
        protected state: Partial<State>,
    ) {
        if (obj.userData.states) {
            this.objStatesSnapshot = JSON.parse(JSON.stringify(obj.userData.states));
        } else {
            this.objStatesSnapshot = obj.userData.states;
        }
    }

    getClonedSnapshot() {
        if (this.objStatesSnapshot) {
            return JSON.parse(JSON.stringify(this.objStatesSnapshot));
        }
        return this.objStatesSnapshot;
    }
}

export class AddStateCommand extends StateCommand implements ICommand {
    exec(stateSrv: StateService) {
        stateSrv.addState(this.obj, this.state);
    }

    undo() {
        this.obj.userData.states = this.getClonedSnapshot();
    }
}

export class RemoveStateCommand extends StateCommand implements ICommand {
    exec(stateSrv: StateService) {
        stateSrv.removeState(this.obj, this.state);
    }

    undo() {
        this.obj.userData.states = this.getClonedSnapshot();
    }
}

export class SetStateCommand extends StateCommand implements ICommand {
    exec(stateSrv: StateService) {

    }

    undo() {
        this.obj.userData.states = this.getClonedSnapshot();
    }
}