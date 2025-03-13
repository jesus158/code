import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerActiveComponent } from './customer-active/customer-active.component';
import { CustomerInactiveComponent } from './customer-inactive/customer-inactive.component';
import { FilterCustomer } from '../pipes/filter-customer.pipe';

@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerActiveComponent,
    CustomerInactiveComponent,
  ],
  imports: [
    CommonModule,
    FilterCustomer,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CustomerFormComponent],
})
export class ComponentsCustomerModule {}
