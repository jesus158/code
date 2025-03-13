import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'statitics' },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/all-chats/all-chats.module').then(
            (m) => m.AllChatsModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../../modules/dashboard/calendar/calendar.module').then(
            (m) => m.CalendarModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/report/report.module').then(
            (m) => m.ReportModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/catalog/catalog.module').then(
            (m) => m.CatalogModule
          ),
      },
      {
        path: 'configuration',
        loadChildren: () =>
          import(
            '../../modules/dashboard/configuration/configuration.module'
          ).then((m) => m.ConfigurationModule),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('../../modules/dashboard/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/kanban/kanban.module').then(
            (m) => m.KanbanModule
          ),
      },
      /*  {
        path: 'permissions',
        loadChildren: () =>
          import('../../modules/dashboard/permissions/permissions.module').then(
            (m) => m.PermissionsModule
          ),
      }, */
      {
        path: 'sales',
        loadChildren: () =>
          import('../../modules/dashboard/sales/sales.module').then(
            (m) => m.SalesModule
          ),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('../../modules/dashboard/statistics/statistics.module').then(
            (m) => m.StatisticsModule
          ),
      },
      {
        path: 'social-networks',
        loadChildren: () =>
          import(
            '../../modules/dashboard/social-networks/social-networks.module'
          ).then((m) => m.SocialNetworksModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
