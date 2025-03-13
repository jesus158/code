import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerActiveComponent } from './components-customer/customer-active/customer-active.component';
import { CustomerFormComponent } from './components-customer/customer-form/customer-form.component';
import { CustomerInactiveComponent } from './components-customer/customer-inactive/customer-inactive.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customer' },
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'active' },
      { path: 'active', component: CustomerActiveComponent },
      { path: 'inactive', component: CustomerInactiveComponent },
    ],
  },
  { path: 'form', component: CustomerFormComponent },
  { path: 'form/:customer_uid', component: CustomerFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
