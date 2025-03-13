import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './leads.component';
import { KanbanComponent } from './components-leads/kanban/kanban.component';
import { LeadsListComponent } from './components-leads/leads-list/leads-list.component';
import { LeadsActiveComponent } from './components-leads/leads-active/leads-active.component';
import { LeadsInactiveComponent } from './components-leads/leads-inactive/leads-inactive.component';
import { LeadsFormComponent } from './components-leads/leads-form/leads-form.component';
import { LeadsCalendarComponent } from './components-leads/leads-calendar/leads-calendar.component';
import { LeadsContentComponent } from './components-leads/leads-content/leads-content.component';

const routes: Routes = [
  {
    path: '',
    component: LeadsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'kanban' },
      {
        path: 'list',
        component: LeadsListComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'active' },
          { path: 'active', component: LeadsActiveComponent },
          { path: 'inactive', component: LeadsInactiveComponent },
        ],
      },
      { path: 'kanban', component: KanbanComponent },
      { path: 'form/:leads_uid', component: LeadsFormComponent },
      { path: 'option/:leads_uid', component: LeadsContentComponent },
      { path: 'calendar', component: LeadsCalendarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadsRoutingModule {}
