import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkstationComponent } from './workstation.component';
import { WorkstationFormComponent } from './components/workstation-form/workstation-form.component';
import { WorkstationActiveComponent } from './components/workstation-active/workstation-active.component';
import { WorkstationInactiveComponent } from './components/workstation-inactive/workstation-inactive.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'workstation' },
  {
    path: 'workstation',
    component: WorkstationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'active' },
      { path: 'active', component: WorkstationActiveComponent },
      { path: 'inactive', component: WorkstationInactiveComponent },
    ],
  },
  { path: 'workstation-form', component: WorkstationFormComponent },
  {
    path: 'workstation-form/:workstation_uid',
    component: WorkstationFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkstationRoutingModule {}
