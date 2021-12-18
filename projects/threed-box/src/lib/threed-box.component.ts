import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProRayCasterController } from './controllers/pro-raycaster-controller';
import { State } from './entity';
import { StateService } from './state.service';
import { ThreedBoxService } from './threed-box.service';

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
  // private proRaycasterCtrllor: ProRayCasterController = new ProRayCasterController();

  constructor(
    public compSrv: ThreedBoxService,
    public stateSrv: StateService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.addEventListener('click', this.onClick.bind(this));

    // this.proRaycasterCtrllor.onIntersected$.subscribe(this.onIntersected.bind(this));
    this.compSrv.init(canvas);
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
    this.selected.next(intersected);
  }
}
