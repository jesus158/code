import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { BusinessFormComponent } from './business-form/business-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'business',
  },
  {
    path: 'business',
    component: BusinessComponent,
  },
  {
    path: 'business-form',
    component: BusinessFormComponent,
  },
  {
    path: 'business-form/:business_uid',
    component: BusinessFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
