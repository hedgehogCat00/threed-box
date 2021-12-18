import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { State } from 'projects/threed-box/src/lib/entity';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'states-panel',
  templateUrl: './states-panel.component.html',
  styleUrls: ['./states-panel.component.less']
})
export class StatesPanelComponent implements OnInit {
  @Input() target!: THREE.Object3D;
  @Output() readonly selectState = new EventEmitter();
  @Output() readonly createState = new EventEmitter();
  @Output() readonly deleteState = new EventEmitter();

  // private _states!: any[];
  get states(): State[] {
    if (this.target.userData.states) {
      return this.target.userData.states;
    }
    return [];
  }

  constructor(private utilsSrv: UtilsService) { }

  ngOnInit(): void { }

  addState() {
    if (!this.states.length) {
      // 创建默认状态以及新状态
      this.createState.next({ fromEmpty: true, states: [this.genState('Default'), this.genState()] });
    } else {
      // 只创建新状态
      this.createState.next({ fromEmpty: false, states: [this.genState()] });
    }
  }

  onSelectState(state: State) {
    this.selectState.next(state);
  }

  onRemoveState(state: State) {
    this.deleteState.next(state);
  }

  private genState(name?: string): State {
    return {
      name: name ? name : this.getNewStateName(),
      id: this.utilsSrv.genUUID(),
      values: {}
    };
  }

  private getNewStateName() {
    if (!this.states.length) {
      return 'State1';
    }
    let stateIdxes = this.states
      .filter(s => /State\d+/.test(s.name))
      .map(s => Number(s.name.replace(/State(\d+)/, '$1')));
    const idx = Math.max(...stateIdxes, 0) + 1;
    return `State${idx}`;
  }
}
