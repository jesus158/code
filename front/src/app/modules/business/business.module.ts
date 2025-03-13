import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { BusinessComponent } from './business.component';
import { BusinessFormComponent } from './business-form/business-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsBusinessModule } from './components-business/components-business.module';

@NgModule({
  declarations: [BusinessComponent, BusinessFormComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsBusinessModule,
  ],
})
export class BusinessModule {}
