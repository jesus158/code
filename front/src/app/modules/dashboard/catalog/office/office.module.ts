import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfficeActiveComponent } from './components/office-active/office-active.component';
import { OfficeInactiveComponent } from './components/office-inactive/office-inactive.component';
import { OfficeComponent } from './office.component';
import { OfficeFormComponent } from './components/office-form/office-form.component';

@NgModule({
  declarations: [
    OfficeComponent,
    OfficeFormComponent,
    OfficeInactiveComponent,
    OfficeActiveComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OfficeRoutingModule,
    DesignLibrariesModule,
  ],
})
export class OfficeModule {}
