import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { SidebarConfigComponent } from './components-configuration/sidebar-config/sidebar-config.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'options' },
      {
        path: 'options',
        component: SidebarConfigComponent,
      },
      {
        path: '',
        loadChildren: () =>
          import(
            '../../../modules/dashboard/configuration/communication-tools/communication-tools.module'
          ).then((m) => m.CommunicationToolsModule),
      },
      {
        path: '',
        loadChildren: () =>
          import(
            '../../../modules/dashboard/configuration/integrations/integrations.module'
          ).then((m) => m.IntegrationsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
