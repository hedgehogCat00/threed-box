import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProRayCasterController } from './controllers/pro-raycaster-controller';
import { LayerCode, State, TransformControlEvt } from './entity';
import { StateService } from './state.service';
import { ThreedBoxService } from './threed-box.service';
import { TransControlService } from './trans-control.service';
import { findAncestorWhere } from './utils/tools';

@Component({
  selector: 'threed-box',
  templateUrl: './threed-box.component.html',
  styleUrls: ['./threed-box.component.less']
})
export class ThreedBoxComponent implements OnInit, AfterViewInit {
  @ViewChild('webglContainer')
  canvasRef!: ElementRef;
  @Input() config!: any;
  @Output() readonly selected = new EventEmitter();

  @Output()
  positionChanged = new EventEmitter<TransformControlEvt>();

  @Output()
  scaleChanged = new EventEmitter<TransformControlEvt>();

  @Output()
  rotationChanged = new EventEmitter<TransformControlEvt>();
  // private proRaycasterCtrllor: ProRayCasterController = new ProRayCasterController();
  private transControlSrv!: TransControlService;

  constructor(
    public compSrv: ThreedBoxService,
    public stateSrv: StateService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    canvas.addEventListener('click', this.onClick.bind(this));

    // this.proRaycasterCtrllor.onIntersected$.subscribe(this.onIntersected.bind(this));
    this.compSrv.init(canvas);

    this.transControlSrv = new TransControlService(this.compSrv.camCtrls, this.compSrv.scene, this.compSrv.renderer.domElement);
    this.transControlSrv.positionChanged$.subscribe(evt => this.positionChanged.emit(evt));
    this.transControlSrv.rotationChanged$.subscribe(evt => this.rotationChanged.emit(evt));
    this.transControlSrv.scaleChanged$.subscribe(evt => this.scaleChanged.emit(evt));
  }

  loadScene$(path: string) {
    return this.compSrv.loadModel$(path).pipe(
      switchMap(model => {
        // model.traverse(obj => {
        //   if (obj.isMesh) {
        //     obj.material = this.compSrv.testLambertMat;
        //   }
        // })
        this.compSrv.scene.add(model);
        return of(model);
      })
    );
  }

  selectState(obj: THREE.Object3D, state: State) {
    obj.userData.activeStateId = state.id;
  }

  createState(obj: THREE.Object3D, state: State) {
    const newState = {
      id: state.id,
      name: state.name,
      props: {
        // 存储当前状态
        object: {},
        material: {}
      }
    };
    if (!obj.userData.states) {
      obj.userData.states = [newState];
    } else {
      obj.userData.states.push(newState);
    }
  }

  private onClick() {
    const intersected = this.compSrv.proRaycasterCtrllor.intersectedObj;
    // // 对辅助工具不检测
    // if (intersected) {
    //   const isMemberOfTool = Boolean(findAncestorWhere(intersected, obj => obj.layers.isEnabled(LayerCode.TOOLS)));
    //   if (isMemberOfTool) {
    //     return;
    //   }
    // }
    this.selected.next(intersected);
    this.transControlSrv.setObject(intersected);
  }
}
