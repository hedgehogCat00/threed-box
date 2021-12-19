import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';

@Component({
    selector: 'vec3',
    template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
        <ng-container *ngIf="value">
            <span>x</span>
            <nz-input-number [(ngModel)]="value.x" [nzSize]="'small'"></nz-input-number>
            <span>y</span>
            <nz-input-number [(ngModel)]="value.y" [nzSize]="'small'"></nz-input-number>
            <span>z</span>
            <nz-input-number [(ngModel)]="value.z" [nzSize]="'small'"></nz-input-number>
        </ng-container>
    </sf-item-wrap>
  `,
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Vec3Widget extends ControlWidget implements OnInit {
    static readonly KEY = 'vec3';

    ngOnInit(): void {
        this.setValue(this.formProperty.formData);
        console.log(this.value);
    }

    change(value: any) {
        this.setValue(value);
    }
}
