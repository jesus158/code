import { Component } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../auth.service';

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('access_password');
  const confirmPassword = control.get('access_confirm_password');

  return password?.value === confirmPassword?.value ? null : { confirm: true };
};

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent {
  access_recovery!: string;

  AccessForm = this.fb.group(
    {
      access_recovery: [''],
      access_password: ['', [Validators.required]],
      access_confirm_password: ['', [Validators.required]],
    },
    { validators: passwordMatchingValidatior }
  );

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.access_recovery = data['access_recovery'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  async update_password(): Promise<any> {
    if (!this.AccessForm.valid) {
      return this.AccessForm.markAllAsTouched();
    } else {
      this.AccessForm.patchValue({
        access_recovery: this.access_recovery,
      });
      const result = await this.authService.update_password(
        this.AccessForm.value
      );
      return result;
    }
  }
}
