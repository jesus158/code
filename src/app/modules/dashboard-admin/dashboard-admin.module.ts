import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { DesignLibrariesModule } from '../design-libraries/design-libraries.module';

@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [CommonModule, DashboardAdminRoutingModule, DesignLibrariesModule],
})
export class DashboardAdminModule {}
