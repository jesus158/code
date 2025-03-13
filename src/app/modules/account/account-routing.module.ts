import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { BusinessOwnerComponent } from './components-account/business-owner/business-owner.component';
import { PreferencesComponent } from './components-account/preferences/preferences.component';
import { UserComponent } from './components-account/user/user.component';
import { SubscriptionsComponent } from './components-account/subscriptions/subscriptions.component';
import { UserFormComponent } from './components-account/user/components-user/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'account',
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'owner',
    component: BusinessOwnerComponent,
  },
  {
    path: 'subscription',
    component: SubscriptionsComponent,
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user-form',
    component: UserFormComponent,
  },
  {
    path: 'user-form/:user_uid',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
