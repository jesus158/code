import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { FollowUpStatusComponent } from './lead/components-lead/follow-up-status/follow-up-status.component';
import { LeadFormComponent } from './lead/components-lead/lead-form/lead-form.component';
import { FollowUpFormComponent } from './lead/components-lead/follow-up/components-follow-up/follow-up-form/follow-up-form.component';
import { KanbanComponent } from './status/components-status/kanban/kanban.component';
import { TableLeadComponent } from './status/components-status/table-lead/table-lead.component';
import { ForgottenComponent } from './status/components-status/forgotten/forgotten.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lead' },
  { 
    path: 'lead',
    component: StatusComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'kanban'},
      {path: 'kanban', component: KanbanComponent},
      {path: 'table', component: TableLeadComponent},
      {path: 'forgotten', component: ForgottenComponent},
    ]
  },
  { path: 'lead-form/:lead_uid', component: LeadFormComponent },
  {path: 'details/:lead_uid', component: DetailsComponent},
  { path: 'follow-up', component: FollowUpStatusComponent },
  { path: 'follow-up-form/:follow_up_uid', component: FollowUpFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanRoutingModule {}
