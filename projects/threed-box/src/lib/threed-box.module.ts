import { NgModule } from '@angular/core';
import { StateService } from './state.service';

import { ThreedBoxComponent } from './threed-box.component';
import { ThreedBoxService } from './threed-box.service';

@NgModule({
  declarations: [ThreedBoxComponent],
  imports: [],
  exports: [ThreedBoxComponent],
  providers: [StateService, ThreedBoxService]
})
export class ThreedBoxModule { }
