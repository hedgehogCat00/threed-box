import { EventEmitter, Injectable } from '@angular/core';
import { zip, fromEvent, Observable } from 'rxjs';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { ProRayCasterController } from './controllers/pro-raycaster-controller';

@Injectable()
export class ThreedBoxService {
  renderer: any;
  scene: any;
  camera: any;
  camCtrls: any;
  pause = true;

  // 存储鼠标相对于canvas中心位置
  private mousePos: { x: number; y: number } = { x: 0, y: 0 };

  // proCamCtrllor: ProCamController;

  proRaycasterCtrllor: ProRayCasterController = new ProRayCasterController();
  intersected!: THREE.Object3D;
  private intersectedEvt = new EventEmitter();

  constructor() {}

  init(canvas: HTMLCanvasElement) {
    this.scene = this.initScene(canvas);
    this.renderer = this.initRenderer(canvas);
    this.camera = this.initCamera(canvas);
    this.camCtrls = this.initCamControls(this.camera, canvas);

    this.scene.add(this.camera);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    const ambientLight = new THREE.AmbientLight(new THREE.Color('rgb(58, 94, 129)'));
    this.scene.add(ambientLight);

    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    // canvas.addEventListener('click', this.onClick.bind(this));
    this.proRaycasterCtrllor.onIntersected$.subscribe(this.onIntersected.bind(this));

    zip(
      fromEvent(window, 'resize')
      // this.globalSrv.layoutChangedEvt.pipe(delay(300))
    ).subscribe(() => {
      this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      this.camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    });

    this.animate();

    // document.body.appendChild(this.stats.dom);
  }

  loadModel$(url: string) {
    return new Observable(subs => {
      const loader = new FBXLoader();
      loader.load(url, obj => {
        subs.next(obj);
      });
    });
  }

  private onMouseMove(evt: MouseEvent) {
    const canvas = this.renderer.domElement;

    this.mousePos.x = (evt.clientX / canvas.width) * 2 - 1;
    this.mousePos.y = -(evt.clientY / canvas.height) * 2 + 1;
  }

  private onIntersected(obj: THREE.Object3D) {
    this.intersected = obj;
  }

  private initRenderer(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    return renderer;
  }

  private initScene(canvas: HTMLCanvasElement) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#adadad');
    return scene;
  }

  private initCamControls(camera: any, canvas: HTMLCanvasElement) {
    const controls = new OrbitControls(camera, canvas);
    return controls;
  }

  private initCamera(canvas: HTMLCanvasElement) {
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 10000);
    camera.position.set(0, 20, 100);
    return camera;
  }

  private animate(delta?: number) {
    requestAnimationFrame(this.animate.bind(this));

    if (this.pause) {
      return;
    }

    this.camCtrls.update();
    this.proRaycasterCtrllor.checkIntersection(this.mousePos, this.scene, this.camera);
    this.renderer.render(this.scene, this.camera);

    // this.stats.update();
  }
}
