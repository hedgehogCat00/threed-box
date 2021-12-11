import { State } from 'projects/threed-box/src/lib/entity';

export interface StateEvt {
  fromEmpty: boolean;
  states: State[];
}
