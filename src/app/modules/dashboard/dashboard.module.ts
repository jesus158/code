import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard.component';
import { DesignLibrariesModule } from '../design-libraries/design-libraries.module';
import { ComponentsDashboardModule } from './components-dashboard/components-dashboard.module';

@NgModule({
  declarations: [CalendarComponent, ReportComponent, DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DesignLibrariesModule,
    ComponentsDashboardModule,
  ],
})
export class DashboardModule {}
