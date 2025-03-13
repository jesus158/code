import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkTeamComponent } from './work-team.component';
import { WorkTeamFormComponent } from './components/work-team-form/work-team-form.component';
import { WorkTeamActiveComponent } from './components/work-team-active/work-team-active.component';
import { WorkTeamInactiveComponent } from './components/work-team-inactive/work-team-inactive.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'work-team' },
  {
    path: 'work-team',
    component: WorkTeamComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'active' },
      { path: 'active', component: WorkTeamActiveComponent },
      { path: 'inactive', component: WorkTeamInactiveComponent },
    ],
  },
  { path: 'work-team-form', component: WorkTeamFormComponent },
  { path: 'work-team-form/:work_team_uid', component: WorkTeamFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkTeamRoutingModule {}
