import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { AccessComponent } from './access/access.component';
import { DesignLibrariesModule } from '../design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import es from '@angular/common/locales/es';
import { GetRecoveryCodeComponent } from './get-recovery-code/get-recovery-code.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AccessComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    GetRecoveryCodeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    DesignLibrariesModule,
  ],
})
export class AuthModule {}
