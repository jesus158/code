import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('../../../modules/dashboard/catalog/office/office.module').then(
        (m) => m.OfficeModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../../../modules/dashboard/catalog/staff/staff.module').then(
        (m) => m.StaffModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../modules/dashboard/catalog/work-team/work-team.module'
      ).then((m) => m.WorkTeamModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../modules/dashboard/catalog/workstation/workstation.module'
      ).then((m) => m.WorkstationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
