import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ThreedBoxModule } from 'projects/threed-box/src/public-api';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { CommandManagerService } from './command-manager.service';
import { ConfigManagerService } from './config-manager.service';

import { ThreedBoxEditorHierarchyTreeComponent } from './hierarchy-tree/hierarchy-tree.component';
import { ObjectPropComponent } from './prop-tabs/object-prop/object-prop.component';
import { PropTabsComponent } from './prop-tabs/prop-tabs.component';
import { StatesPanelComponent } from './states-panel/states-panel.component';
import { StatesUtilService } from './states-panel/states-util.service';
import { ThreedBoxEditorRoutingModule } from './threed-box-editor-routing.module';
import { ThreedBoxEditorComponent } from './threed-box-editor.component';

const COMPONENTS: Array<Type<void>> = [
  ThreedBoxEditorComponent,
  ThreedBoxEditorHierarchyTreeComponent,
  ObjectPropComponent,
  PropTabsComponent,
  StatesPanelComponent
];

@NgModule({
  imports: [
    SharedModule,
    ThreedBoxEditorRoutingModule,
    FormsModule,
    ThreedBoxModule,
    NzTreeModule,
    NzTabsModule
  ],
  declarations: COMPONENTS,
  providers: [
    UtilsService,
    StatesUtilService,
    CommandManagerService,
    ConfigManagerService
  ]
})
export class ThreedBoxEditorModule { }
