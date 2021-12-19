import { Injectable } from '@angular/core';
import { State } from 'projects/threed-box/src/lib/entity';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Injectable()
export class StatesUtilService {

  constructor(
    private utilsSrv: UtilsService
  ) { }

  genState(name?: string, states?: State[]): State {
    return {
      name: name ? name : this.getNewStateName(states || []),
      id: this.utilsSrv.genUUID(),
      values: {
        object: {},
        material: {}
      }
    };
  }

  private getNewStateName(states: State[]) {
    if (!states.length) {
      return 'State1';
    }
    let stateIdxes = states
      .filter(s => /State\d+/.test(s.name))
      .map(s => Number(s.name.replace(/State(\d+)/, '$1')));
    const idx = Math.max(...stateIdxes, 0) + 1;
    return `State${idx}`;
  }
}
