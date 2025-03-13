import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { ComponentsCustomerModule } from './components-customer/components-customer.module';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ComponentsCustomerModule,
    DesignLibrariesModule,
  ],
})
export class CustomerModule {}
