import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';
import { StaffActiveComponent } from './components/staff-active/staff-active.component';
import { StaffInactiveComponent } from './components/staff-inactive/staff-inactive.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'staff' },
  {
    path: 'staff',
    component: StaffComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'active' },
      { path: 'active', component: StaffActiveComponent },
      { path: 'inactive', component: StaffInactiveComponent },
    ],
  },
  { path: 'staff-form', component: StaffFormComponent },
  { path: 'staff-form/:staff_uid', component: StaffFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
