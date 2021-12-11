import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { State } from 'projects/threed-box/src/lib/entity';
import { ThreedBoxComponent } from 'projects/threed-box/src/public-api';

import { StateEvt } from './states-panel/entity';

@Component({
  selector: 'app-threed-box-editor',
  templateUrl: './threed-box-editor.component.html',
  styleUrls: ['./threed-box-editor.component.less']
})
export class ThreedBoxEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('threedBox') threedBox!: ThreedBoxComponent;
  scene!: THREE.Scene;
  selectedObj!: THREE.Object3D;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.threedBox.compSrv.pause = false;
    this.threedBox.loadScene$('assets/models/monkey-head-2.fbx').subscribe(model => {
      console.log('model', model);
      this.scene = this.threedBox.compSrv.scene;
    });
  }

  onCreateState(evt: StateEvt) {
    if (evt.fromEmpty) {
      // 创建默认状态以及第一个状态
    } else {
      // 新建状态
    }
  }

  onDeleteState(state: State) {}

  onSelected(obj: THREE.Object3D) {
    console.log('selected', obj);

    if (!obj) {
      // 认为选中了背景，也即 Scene
      this.selectedObj = this.scene;
    } else {
      this.selectedObj = obj;
    }
  }
}
