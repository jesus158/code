import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { BusinessOwnerService } from '../../account/components-account/business-owner/business-owner.service';

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('business_owner_password');
  const confirmPassword = control.get('business_owner_confirm_password');

  return password?.value === confirmPassword?.value ? null : { confirm: true };
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  value1?: string;
  value11: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  /* user: any = []; */

  BusinessForm = this.fb.group(
    {
      business_owner_firts_name: ['', [Validators.required]],
      business_owner_last_name: ['', [Validators.required]],
      business_owner_email: ['', [Validators.required]],
      business_owner_username: ['', [Validators.required]],
      business_owner_number_phone: ['', [Validators.required]],
      business_owner_birthday: [new Date(), [Validators.required]],
      business_owner_country: ['', [Validators.required]],
      business_owner_password: ['', [Validators.required]],
      business_owner_confirm_password: ['', [Validators.required]],
    },
    { validators: passwordMatchingValidatior }
  );

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private router: Router,
    private businessOwnerService: BusinessOwnerService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  async auth(): Promise<any> {
    if (!this.BusinessForm.valid) {
      return this.BusinessForm.markAllAsTouched();
    } else {
      const result = await this.businessOwnerService.post_business_owner(
        this.BusinessForm.value
      );
      if (result.status !== 404) {
        this.BusinessForm.reset();
        this.Login();
      }
      return result;
    }
  }

  Login() {
    this.router.navigate([`access`]);
  }

  onBack() {
    this.router.navigate([`home`]);
  }

  resetPassword() {
    this.router.navigate([`reset-password`]);
  }
}
