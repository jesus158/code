import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadModalComponent } from './lead-modal/lead-modal.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadFormComponent } from './lead-form/lead-form.component';
import { FollowUpModule } from './follow-up/follow-up.module';
import { FollowUpStatusComponent } from './follow-up-status/follow-up-status.component';
import { ComponentsStatusModule } from '../../status/components-status/components-status.module';
import { LeadCalendarComponent } from './lead-calendar/lead-calendar.component';

@NgModule({
  declarations: [
    LeadFormComponent,
    FollowUpStatusComponent,
    LeadCalendarComponent,
  ],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
    FollowUpModule,
    ComponentsStatusModule,
  ],
  exports: [],
})
export class ComponentsLeadModule {}
