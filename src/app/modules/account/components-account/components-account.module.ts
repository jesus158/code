import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessOwnerComponent } from './business-owner/business-owner.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferencesComponent } from './preferences/preferences.component';
import { UserComponent } from './user/user.component';
import { ComponentsPreferencesModule } from './preferences/components-preferences/components-preferences.module';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ComponentsUserModule } from './user/components-user/components-user.module';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionsModuleComponent } from './permissions-module/permissions-module.component';

@NgModule({
  declarations: [
    BusinessOwnerComponent,
    PreferencesComponent,
    UserComponent,
    ResetPasswordComponent,
    SubscriptionsComponent,
    PermissionsComponent,
    PermissionsModuleComponent,
  ],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsPreferencesModule,
    ComponentsUserModule,
  ],
  exports: [
    BusinessOwnerComponent,
    PreferencesComponent,
    UserComponent,
    ResetPasswordComponent,
    SubscriptionsComponent,
  ],
})
export class ComponentsAccountModule {}
