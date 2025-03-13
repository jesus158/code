import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsBusinessComponent } from './stats-business/stats-business.component';
import { StatsUserComponent } from './stats-user/stats-user.component';
import { StatsSubscriptionComponent } from './stats-subscription/stats-subscription.component';
import { StatsAccountComponent } from './stats-account/stats-account.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';

@NgModule({
  declarations: [
    StatsBusinessComponent,
    StatsUserComponent,
    StatsSubscriptionComponent,
    StatsAccountComponent,
  ],
  imports: [CommonModule, DesignLibrariesModule],
  exports: [
    StatsBusinessComponent,
    StatsUserComponent,
    StatsSubscriptionComponent,
    StatsAccountComponent,
  ],
})
export class ComponentsStatsModule {}
