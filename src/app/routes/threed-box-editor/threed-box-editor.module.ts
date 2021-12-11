import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ThreedBoxModule } from 'projects/threed-box/src/public-api';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { ThreedBoxEditorHierarchyTreeComponent } from './hierarchy-tree/hierarchy-tree.component';
import { PropTabsComponent } from './prop-tabs/prop-tabs.component';
import { StatesPanelComponent } from './states-panel/states-panel.component';
import { ThreedBoxEditorRoutingModule } from './threed-box-editor-routing.module';
import { ThreedBoxEditorComponent } from './threed-box-editor.component';

const COMPONENTS: Array<Type<void>> = [
  ThreedBoxEditorComponent,
  ThreedBoxEditorHierarchyTreeComponent,
  PropTabsComponent,
  StatesPanelComponent
];

@NgModule({
  imports: [SharedModule, ThreedBoxEditorRoutingModule, ThreedBoxModule, NzTreeModule, NzTabsModule],
  declarations: COMPONENTS,
  providers: [UtilsService]
})
export class ThreedBoxEditorModule {}
