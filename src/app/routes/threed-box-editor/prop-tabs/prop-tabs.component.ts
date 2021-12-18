import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prop-tabs',
  templateUrl: './prop-tabs.component.html',
  styleUrls: ['./prop-tabs.component.less']
})
export class PropTabsComponent implements OnInit {
  tabs = [{
    name: 'world',
    content: 'this is world props'
  }, {
    name: 'object',
    content: 'this is object props'
  }, {
    name: 'material',
    content: 'this is material props'
  }]

  @Input() scene!: THREE.Scene;
  @Input() target!: THREE.Object3D;

  constructor() { }

  ngOnInit(): void {
  }

}
