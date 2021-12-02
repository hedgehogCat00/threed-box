import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreedBoxEditorComponent } from './threed-box-editor.component';
import { ThreedBoxEditorHierarchyTreeComponent } from './hierarchy-tree/hierarchy-tree.component';

const routes: Routes = [
  { path: '', component: ThreedBoxEditorComponent }
,
  { path: 'hierarchy-tree', component: ThreedBoxEditorHierarchyTreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreedBoxEditorRoutingModule { }
