import { NgModule } from '@angular/core';
import { DelonFormModule, WidgetRegistry } from '@delon/form';

import { SharedModule } from '../shared.module';
import { TestWidget } from './test/test.widget';
import { Vec3Widget } from './vec3.widget';

export const SCHEMA_THIRDS_COMPONENTS = [TestWidget, Vec3Widget];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  imports: [SharedModule, DelonFormModule.forRoot()],
  exports: SCHEMA_THIRDS_COMPONENTS
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register(TestWidget.KEY, TestWidget);
    widgetRegistry.register(Vec3Widget.KEY, Vec3Widget);
  }
}
