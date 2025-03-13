import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'access' },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard-admin/dashboard-admin.module').then(
        (m) => m.DashboardAdminModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/business/business.module').then(
        (m) => m.BusinessModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/stats/stats.module').then((m) => m.StatsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
