import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardAdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'plans' },
      {
        path: '',
        loadChildren: () =>
          import('./plans/plans.module').then((m) => m.PlansModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdminRoutingModule {}
