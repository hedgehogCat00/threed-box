export interface State {
  name: string;
  id: string;
  values: StateValues;
}
export interface StateValues {
  object: any,
  material?: any | any[]
}

export const stateGroupProps = [
  {
    key: '',
    type: ''
  }
];

export const stateMeshProps = [
  {
    key: '',
    type: ''
  }
];

export enum LayerCode {
  TOOLS = 2
}

export interface TransformControlEvt {
  value: any;
  /**
   * 若拖拽完成，则为 true
   */
  confirm?: boolean;
}