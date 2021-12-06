import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ThreedBoxModule } from 'projects/threed-box/src/public-api';
import { ThreedBoxEditorRoutingModule } from './threed-box-editor-routing.module';
import { ThreedBoxEditorComponent } from './threed-box-editor.component';
import { ThreedBoxEditorHierarchyTreeComponent } from './hierarchy-tree/hierarchy-tree.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PropTabsComponent } from './prop-tabs/prop-tabs.component';

const COMPONENTS: Type<void>[] = [ThreedBoxEditorComponent,
  ThreedBoxEditorHierarchyTreeComponent, PropTabsComponent];

@NgModule({
  imports: [
    SharedModule,
    ThreedBoxEditorRoutingModule,
    ThreedBoxModule,
    NzTreeModule,
    NzTabsModule
  ],
  declarations: COMPONENTS,
})
export class ThreedBoxEditorModule { }
