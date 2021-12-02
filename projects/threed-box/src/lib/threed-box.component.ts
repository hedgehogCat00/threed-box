import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ThreedBoxService } from './threed-box.service';

@Component({
  selector: 'threed-box',
  templateUrl: './threed-box.component.html',
  styleUrls: ['./threed-box.component.less']
})
export class ThreedBoxComponent implements OnInit, AfterViewInit {
  @ViewChild('webglContainer')
  canvasRef!: ElementRef;

  constructor(
    public compSrv: ThreedBoxService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.compSrv.init(this.canvasRef.nativeElement);
  }

  loadScene$(path: string) {
    return this.compSrv.loadModel$(path)
      .pipe(
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
}
