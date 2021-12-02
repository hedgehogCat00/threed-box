import { NgModule } from '@angular/core';
import { ThreedBoxComponent } from './threed-box.component';
import { ThreedBoxService } from './threed-box.service';



@NgModule({
  declarations: [
    ThreedBoxComponent
  ],
  imports: [
  ],
  exports: [
    ThreedBoxComponent
  ],
  providers: [ThreedBoxService]
})
export class ThreedBoxModule { }
