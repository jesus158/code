import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatsCustomerComponent } from './stats-customer/stats-customer.component';
import { StatsBusinessComponent } from './stats-business/stats-business.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { ComponentsDashboardModule } from '../components-dashboard/components-dashboard.module';
import { StatsOwnerComponent } from './stats-owner/stats-owner.component';

@NgModule({
  declarations: [StatsCustomerComponent, StatsBusinessComponent, StatsOwnerComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    DesignLibrariesModule,
    ComponentsDashboardModule,
  ],
})
export class StatisticsModule {}
