import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RolesFormComponent } from './components-roles/roles-form/roles-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'roles' },
  {
    path: 'roles',
    component: RolesComponent,
  },
  { path: 'roles-form', component: RolesFormComponent },
  { path: 'roles-form/:roles_uid', component: RolesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
