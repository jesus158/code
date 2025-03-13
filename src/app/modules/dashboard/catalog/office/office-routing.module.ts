import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeComponent } from './office.component';
import { OfficeFormComponent } from './components/office-form/office-form.component';
import { OfficeActiveComponent } from './components/office-active/office-active.component';
import { OfficeInactiveComponent } from './components/office-inactive/office-inactive.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'office' },
  {
    path: 'office',
    component: OfficeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'active' },
      { path: 'active', component: OfficeActiveComponent },
      { path: 'inactive', component: OfficeInactiveComponent },
    ],
  },
  { path: 'office-form', component: OfficeFormComponent },
  { path: 'office-form/:office_uid', component: OfficeFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule {}
