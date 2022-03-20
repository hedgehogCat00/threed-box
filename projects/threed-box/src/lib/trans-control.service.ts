import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { LayerCode, TransformControlEvt } from './entity';
import { EventEmitter } from '@angular/core';


export class TransControlService {
  control!: TransformControls;
  positionChanged$ = new EventEmitter<TransformControlEvt>();
  scaleChanged$ = new EventEmitter<TransformControlEvt>();
  rotationChanged$ = new EventEmitter<TransformControlEvt>();

  private keydownMap = new Map([
    [[87, 'w'], () => {
      this.control.setMode('translate')
    }],
    [[69, 'e'], () => this.control.setMode('rotate')],
    [[82, 'r'], () => this.control.setMode('scale')],
  ]);

  constructor(
    private camControls: OrbitControls,
    scene: THREE.Scene,
    dom: HTMLElement
  ) {
    this.control = new TransformControls(camControls.object, dom);
    this.control.layers.enable(LayerCode.TOOLS);
    this.control.getRaycaster().layers.enable(LayerCode.TOOLS);

    scene.add(this.control);
    this.subsEvts();
  }

  setObject(obj?: any) {
    if (obj) {
      this.control.attach(obj);
    } else {
      this.control.detach();
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.onWindowKeydown);
    this.control.dispose();
  }

  private onWindowKeydown(event: KeyboardEvent) {
    Array.from(this.keydownMap.entries()).find(pair => {
      const key = pair[0];
      const cb = pair[1];
      if (event.keyCode === key[0] || event.key === key[1]) {
        cb();
      }
    })
  }

  private subsEvts() {
    window.addEventListener('keydown', this.onWindowKeydown.bind(this));

    const actionsMap = new Map([
      ['translate', { key: 'position', evt: this.positionChanged$ }],
      ['rotate', { key: 'rotation', evt: this.rotationChanged$ }],
      ['scale', { key: 'scale', evt: this.scaleChanged$ }],
    ])
    // 拖拽时关闭摄像机移动
    this.control.addEventListener('dragging-changed', (event) => {
      this.camControls.enabled = !event.value;
      const isDragging = event.value;
      const currObj = this.control.object as any;
      if (currObj) {
        const config = actionsMap.get(this.control.mode);
        config?.evt.emit({ value: currObj![config.key], confirm: !isDragging })
      }
    });
    // this.control.addEventListener('objectChange', (evt) => {

    // })
    // this.control.addEventListener('mouseDown', (evt) => {
    // })
    // this.control.addEventListener('mouseUp', (evt) => {
    //   console.log('mouse up');
    // })
  }
}
