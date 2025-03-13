import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusModalfComponent } from './status-modalf/status-modalf.component';
import { KanbanComponent } from './kanban/kanban.component';
import { TableLeadComponent } from './table-lead/table-lead.component';
import { LeadComponent } from '../../lead/lead.component';
import { LeadModalComponent } from '../../lead/components-lead/lead-modal/lead-modal.component';
import { TimelineModalComponent } from './timeline-modal/timeline-modal.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { ActivitiesModalComponent } from './activities-modal/activities-modal.component';
import { LeadOptionsComponent } from 'src/app/components/lead-options/lead-options.component';
import { CardActivitiesComponent } from 'src/app/components/card-activities/card-activities.component';
import { CardTimelinesComponent } from 'src/app/components/card-timelines/card-timelines.component';
@NgModule({
  declarations: [
    LeadModalComponent,
    StatusModalComponent,
    StatusModalfComponent,
    KanbanComponent,
    TableLeadComponent,
    LeadComponent,
    ActivitiesModalComponent,
    TimelineModalComponent,
    ForgottenComponent
  ],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
    CardActivitiesComponent,
    CardTimelinesComponent,
    LeadOptionsComponent
  ],
  exports: [StatusModalComponent, StatusModalfComponent],
})
export class ComponentsStatusModule {}
