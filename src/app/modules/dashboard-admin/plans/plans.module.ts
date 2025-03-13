import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { ComponentsPlansModule } from './components-plans/components-plans.module';

@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    ComponentsPlansModule,
    DesignLibrariesModule,
  ],
})
export class PlansModule {}
