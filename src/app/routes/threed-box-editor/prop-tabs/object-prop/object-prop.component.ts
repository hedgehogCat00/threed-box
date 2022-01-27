import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SFSchema, SFValueChange } from '@delon/form';
import { State } from 'projects/threed-box/src/lib/entity';
import { Euler, Vector3 } from 'three';
import { CommandManagerService } from '../../command-manager.service';
import { SetEulerCommand } from '../../commands/object.command';

@Component({
  selector: 'object-prop',
  templateUrl: './object-prop.component.html',
  styleUrls: ['./object-prop.component.less']
})
export class ObjectPropComponent implements OnInit, AfterViewInit, OnChanges {

  private _object !: THREE.Object3D;
  @Input() get object(): THREE.Object3D {
    return this._object;
  }
  set object(v: THREE.Object3D) {
    this._object = v;
    // this.initSchema();
  }
  @Input() activeStateIdx: number = 0;

  schema!: SFSchema;
  data!: any;

  constructor(
    public commandSrv: CommandManagerService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initSchema();
  }

  onFormValueChange(evt: SFValueChange) {
    console.log('form value changed', evt)
    const pathVal = evt.pathValue;

    if (evt.path === '/rotation') {
      // ['x', 'y', 'z'].forEach(k => {
      //   // 当前状态赋值
      //   this.data.rotation[k] = pathVal[k];
      // });
      // // 同步到物体
      // this.object.rotation.set(pathVal.x, pathVal.y, pathVal.z);
      const cmd = new SetEulerCommand(this.data, this.object as any, pathVal);
      this.commandSrv.exec(cmd, null);
    }
  }

  private initSchema() {
    // const activeStateIdx = this.object.userData.currState || 0;
    const state: State = this.object.userData.states[this.activeStateIdx || 0];
    const schema: SFSchema = {
      type: 'object',
      properties: {}
    }

    Object.entries(state.values.object)
      .forEach(pair => {
        const key = pair[0];
        const val = pair[1];

        schema.properties![key] = this.genPropSchema(key, val);
      });
    this.schema = schema;
    this.data = state.values.object;
    console.log('data', this.data)
    console.log('schema', this.schema)
  }

  private genPropSchema(key: string, val: any): any {
    const obj = this.object as any;
    if (obj[key] instanceof Vector3) {
      return {
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          z: { type: 'number' },
        },
        ui: {
          widget: 'vec3'
        }
      }
    } else if (obj[key] instanceof Euler) {
      return {
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          z: { type: 'number' },
        },
        ui: {
          widget: 'euler'
        }
      }
    }

    const schema = {
      type: this.getSchemaType(key, val),
    };
    if (schema.type !== 'boolean' && schema.type !== 'number') {
      Object.assign(schema, {
        ui: {
          widget: this.genSchemaWidget(key, val)
        }
      })
    }

    return schema;
  }

  private genSchemaWidget(key: string, val: any) {
    const obj = this.object as any;
    if (obj[key] instanceof Vector3) {
      return 'vec3'
    }
    return 'string';
    // switch (key) {
    //   case 'position':
    //     return 'vec3'
    //   default:
    //     return 'string'
    // }
  }

  private getSchemaType(key: string, val: any) {
    switch (typeof val) {
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      default:
        return 'string';
    }
  }

  ngAfterViewInit(): void {

  }
}
