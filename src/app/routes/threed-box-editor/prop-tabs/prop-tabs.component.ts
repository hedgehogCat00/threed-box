import { Component, Input, OnInit } from '@angular/core';
// import { ObjectPropComponent } from './object-prop/object-prop.component';

@Component({
  selector: 'prop-tabs',
  templateUrl: './prop-tabs.component.html',
  styleUrls: ['./prop-tabs.component.less']
})
export class PropTabsComponent implements OnInit {
  // tabs = [{
  //   name: 'world',
  //   component: null
  // }, {
  //   name: 'object',
  //   component: ObjectPropComponent
  // }, {
  //   name: 'material',
  //   content: 'this is material props'
  // }]

  @Input() scene!: THREE.Scene;
  @Input() target!: THREE.Object3D;
  @Input() targetActiveStateIdx!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
