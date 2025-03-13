import { Component } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/auth.service';

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('access_password');
  const confirmPassword = control.get('access_confirm_password');

  return password?.value === confirmPassword?.value ? null : { confirm: true };
};

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  access_recovery!: string;

  AccessForm = this.fb.group(
    {
      access_password: ['', [Validators.required]],
      access_new_password: ['', [Validators.required]],
      access_confirm_password: ['', [Validators.required]],
    },
    { validators: passwordMatchingValidatior }
  );

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  async update_password(): Promise<any> {
    if (!this.AccessForm.valid) {
      return this.AccessForm.markAllAsTouched();
    } else {
      const result = await this.authService.update_password_dash(
        this.AccessForm.value
      );
      return result;
    }
  }
}
