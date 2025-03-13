import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkTeamRoutingModule } from './work-team-routing.module';
import { WorkTeamComponent } from './work-team.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkTeamActiveComponent } from './components/work-team-active/work-team-active.component';
import { WorkTeamFormComponent } from './components/work-team-form/work-team-form.component';
import { WorkTeamInactiveComponent } from './components/work-team-inactive/work-team-inactive.component';

@NgModule({
  declarations: [
    WorkTeamComponent,
    WorkTeamFormComponent,
    WorkTeamActiveComponent,
    WorkTeamInactiveComponent,
  ],
  imports: [
    CommonModule,
    WorkTeamRoutingModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WorkTeamModule {}
