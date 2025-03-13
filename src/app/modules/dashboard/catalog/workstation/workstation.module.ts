import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkstationRoutingModule } from './workstation-routing.module';
import { WorkstationComponent } from './workstation.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkstationActiveComponent } from './components/workstation-active/workstation-active.component';
import { WorkstationFormComponent } from './components/workstation-form/workstation-form.component';
import { WorkstationInactiveComponent } from './components/workstation-inactive/workstation-inactive.component';

@NgModule({
  declarations: [
    WorkstationComponent,
    WorkstationFormComponent,
    WorkstationActiveComponent,
    WorkstationInactiveComponent,
  ],
  imports: [
    CommonModule,
    WorkstationRoutingModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WorkstationModule {}
