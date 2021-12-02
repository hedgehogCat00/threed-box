import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'hierarchy-tree',
  templateUrl: './hierarchy-tree.component.html',
})
export class ThreedBoxEditorHierarchyTreeComponent implements OnInit {

  private _scene!: THREE.Scene;
  get scene(): THREE.Scene {
    return this._scene;
  }
  @Input()
  set scene(v: THREE.Scene) {
    this._scene = v;
    if (this.scene) {
      this.initNodes();
    }
  }

  nodes: any[] = [];

  constructor() { }

  ngOnInit(): void { }

  private initNodes() {
    const rootNode: any = {};
    const queue: any = [{ node: rootNode, obj: this.scene }];
    while (queue.length) {
      const curr = queue.shift();
      const obj: THREE.Object3D = curr.obj;
      const node = curr.node;

      Object.assign(curr.node, {
        key: obj.uuid,
        title: obj.name,
        type: obj.type
      });

      if (curr.parent) {
        curr.parent.children.push(node);
      }

      if (obj.children && obj.children.length) {
        Object.assign(curr.node, {
          children: []
        });
        obj.children.forEach(child => {
          queue.push({
            parent: node,
            node: {},
            obj: child
          })
        })

      }
    }
    this.nodes = [rootNode];
  }
}