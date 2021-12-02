import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThreedBoxComponent } from 'projects/threed-box/src/public-api';

@Component({
  selector: 'app-threed-box-editor',
  templateUrl: './threed-box-editor.component.html',
  styleUrls: ['./threed-box-editor.component.less']
})
export class ThreedBoxEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('threedBox') threedBox!: ThreedBoxComponent;
  scene!: THREE.Scene;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.threedBox.compSrv.pause = false;
    this.threedBox
      .loadScene$('assets/models/monkey-head-2.fbx')
      .subscribe((model) => {
        console.log('model', model);
        this.scene = this.threedBox.compSrv.scene;
      });
  }
}
