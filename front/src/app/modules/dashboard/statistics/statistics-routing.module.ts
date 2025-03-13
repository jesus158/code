import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsBusinessComponent } from './stats-business/stats-business.component';
import { StatsCustomerComponent } from './stats-customer/stats-customer.component';
import { StatsOwnerComponent } from './stats-owner/stats-owner.component';

const routes: Routes = [
  {
    path: 'owner',
    component: StatsOwnerComponent,
  },
  {
    path: 'business',
    component: StatsBusinessComponent,
  },
  {
    path: 'customer',
    component: StatsCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
