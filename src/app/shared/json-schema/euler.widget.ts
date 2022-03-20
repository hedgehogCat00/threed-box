import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';

@Component({
    selector: 'euler',
    template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
        <ng-container *ngIf="value">
            <nz-input-group nzAddOnBefore="x" nzAddOnAfter="°">
                <nz-input-number [(ngModel)]="xVal" [nzSize]="'small'"></nz-input-number>
            </nz-input-group>
            
            <nz-input-group nzAddOnBefore="y" nzAddOnAfter="°">
                <nz-input-number [(ngModel)]="yVal" [nzSize]="'small'"></nz-input-number>
            </nz-input-group>

            <nz-input-group nzAddOnBefore="z" nzAddOnAfter="°">
                <nz-input-number [(ngModel)]="zVal" [nzSize]="'small'"></nz-input-number>
            </nz-input-group>
        </ng-container>
    </sf-item-wrap>
  `,
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EulerWidget extends ControlWidget implements OnInit, OnDestroy {
    static readonly KEY = 'euler';
    displayValues = { x: 0, y: 0, z: 0 };

    private _xVal !: number;
    public get xVal(): number {
        return this._xVal;
    }
    public set xVal(v: number) {
        this._xVal = v;
        const newVal = Object.assign(this.value, { x: this.angle2Rad(v) })
        this.setValue(newVal);
    }

    private _yVal !: number;
    public get yVal(): number {
        return this._yVal;
    }
    public set yVal(v: number) {
        this._yVal = v;
        const newVal = Object.assign(this.value, { y: this.angle2Rad(v) })
        // this.value.y = this.angle2Rad(v);
        this.setValue(newVal);
    }

    private _zVal !: number;
    public get zVal(): number {
        return this._zVal;
    }
    public set zVal(v: number) {
        this._zVal = v;
        const newVal = Object.assign(this.value, { z: this.angle2Rad(v) })
        // this.value.z = this.angle2Rad(v);
        this.setValue(newVal);
    }


    ngOnInit(): void {
        const rawVal = this.formProperty.formData as any;
        this.setValue({ x: rawVal.x, y: rawVal.y, z: rawVal.z });
        this._xVal = this.radiant2Angle(rawVal.x);
        this._yVal = this.radiant2Angle(rawVal.y);
        this._zVal = this.radiant2Angle(rawVal.z);
    }

    ngOnDestroy(): void {

    }

    reset(_value: any): void {
        this.setValue(_value);
        this._xVal = this.radiant2Angle(_value?.x || 0);
        this._yVal = this.radiant2Angle(_value?.y || 0);
        this._zVal = this.radiant2Angle(_value?.z || 0);
    }

    // change(value: any) {
    //     this.setValue(value);
    // }

    private radiant2Angle(rad: number = 0) {
        return rad / Math.PI * 180;
    }

    private angle2Rad(angle: number = 0) {
        return angle / 180 * Math.PI;
    }
}
