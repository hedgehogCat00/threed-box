import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BoxGeometry, Mesh, MeshBasicMaterial, Group } from 'three';
import { State } from 'projects/threed-box/src/lib/entity';
import { ThreedBoxComponent } from 'projects/threed-box/src/public-api';
import { ConfigManagerService } from './config-manager.service';

import { StateEvt } from './states-panel/entity';
import { CommandManagerService } from './command-manager.service';
import { AddStateCommand, RemoveStateCommand } from './commands/state.command';

@Component({
  selector: 'app-threed-box-editor',
  templateUrl: './threed-box-editor.component.html',
  styleUrls: ['./threed-box-editor.component.less']
})
export class ThreedBoxEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('threedBox') threedBox!: ThreedBoxComponent;
  scene!: THREE.Scene;
  selectedObj!: THREE.Object3D;

  constructor(
    private configSrv: ConfigManagerService,
    public commandSrv: CommandManagerService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.threedBox.compSrv.pause = false;
    this.threedBox.loadScene$('assets/models/monkey-head-2.fbx').subscribe(model => {
      console.log('model', model);
      this.scene = this.threedBox.compSrv.scene;

      this.testAddBox();
    });
  }

  onCreateState(evt: StateEvt) {
    const stateSrv = this.threedBox.stateSrv;
    if (evt.fromEmpty) {
      // 创建默认状态以及第一个状态
      // stateSrv.addState(this.selectedObj, evt.states[0]);
      // stateSrv.addState(this.selectedObj, evt.states[1]);

      const addCmd1 = new AddStateCommand(this.selectedObj, evt.states[0]);
      this.commandSrv.exec(addCmd1, stateSrv);

      const addCmd2 = new AddStateCommand(this.selectedObj, evt.states[1]);
      this.commandSrv.exec(addCmd2, stateSrv);
    } else {
      // 新建状态
      // stateSrv.addState(this.selectedObj, evt.states[0]);
      const addCmd = new AddStateCommand(this.selectedObj, evt.states[0]);
      this.commandSrv.exec(addCmd, stateSrv);
    }

    this.configSrv.recordObjState(this.selectedObj);
  }

  onDeleteState(state: State) {
    const stateSrv = this.threedBox.stateSrv;
    // stateSrv.removeState(this.selectedObj, state);
    const removeCmd = new RemoveStateCommand(this.selectedObj, state);
    this.commandSrv.exec(removeCmd, stateSrv);

    this.configSrv.recordObjState(this.selectedObj);
  }

  onSelected(obj: THREE.Object3D) {
    console.log('selected', obj);

    if (!obj) {
      // 认为选中了背景，也即 Scene
      this.selectedObj = this.scene;
    } else {
      this.selectedObj = obj;
    }
  }

  exportConfig() {
    this.configSrv.export(this.scene);
  }

  private testAddBox() {
    const geo = new BoxGeometry(100, 100, 100)
    const mat = new MeshBasicMaterial({ color: 'yellow' })
    const mesh = new Mesh(geo, mat);
    mesh.position.set(100, 0, 0)

    const group = new Group();
    group.add(mesh as any)
    this.scene.add(group as any);
  }
}
