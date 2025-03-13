import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { DesignLibrariesModule } from '../design-libraries/design-libraries.module';
import { ComponentsStatsModule } from './components-stats/components-stats.module';

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    ComponentsStatsModule,
    DesignLibrariesModule,
  ],
})
export class StatsModule {}
