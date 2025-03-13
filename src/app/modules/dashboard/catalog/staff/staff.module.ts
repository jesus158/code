import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffActiveComponent } from './components/staff-active/staff-active.component';
import { StaffInactiveComponent } from './components/staff-inactive/staff-inactive.component';
import { StaffComponent } from './staff.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';

@NgModule({
  declarations: [
    StaffComponent,
    StaffFormComponent,
    StaffInactiveComponent,
    StaffActiveComponent,
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StaffModule {}
