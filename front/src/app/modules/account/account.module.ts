import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ComponentsAccountModule } from './components-account/components-account.module';
import { DesignLibrariesModule } from '../design-libraries/design-libraries.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    DesignLibrariesModule,
    ComponentsAccountModule,
  ],
})
export class AccountModule {}
