import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { StatusComponent } from './status/status.component';
import { LeadComponent } from './lead/lead.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { ComponentsLeadModule } from './lead/components-lead/components-lead.module';
import { ComponentsStatusModule } from './status/components-status/components-status.module';
import { DetailsComponent } from './details/details.component';
import { ColorActivityDirective } from 'src/app/directives/color-activity.directive';
import { LeadOptionsComponent } from 'src/app/components/lead-options/lead-options.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CardActivitiesComponent } from 'src/app/components/card-activities/card-activities.component';
import { CardTimelinesComponent } from 'src/app/components/card-timelines/card-timelines.component';

@NgModule({
  declarations: [StatusComponent, DetailsComponent],
  imports: [
    CommonModule,
    ColorActivityDirective,
    KanbanRoutingModule,
    DesignLibrariesModule,
    LeadOptionsComponent,
    CardActivitiesComponent,
    CardTimelinesComponent
    //ComponentsLeadModule,
    //ComponentsStatusModule,
  ],
  providers: [DialogService]
})
export class KanbanModule {}
