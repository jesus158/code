import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { BusinessOwnerService } from './business-owner.service';
import { BusinessOwner } from './interfaces/business-owner';

@Component({
  selector: 'app-business-owner',
  templateUrl: './business-owner.component.html',
  styleUrls: ['./business-owner.component.scss'],
})
export class BusinessOwnerComponent {
  value1?: string;
  value11: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  /* user: any = []; */

  BusinessOwnerForm = this.fb.group({
    business_owner_firts_name: ['', [Validators.required]],
    business_owner_last_name: ['', [Validators.required]],
    business_owner_email: ['', [Validators.required]],
    business_owner_number_phone: ['', [Validators.required]],
    business_owner_birthday: [new Date(), [Validators.required]],
    business_owner_country: ['', [Validators.required]],
  });

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private router: Router,
    private businessOwnerService: BusinessOwnerService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getBusinessOwner();
  }

  async getBusinessOwner(): Promise<BusinessOwner[]> {
    const result = await this.businessOwnerService.get_business_owner();
    this.BusinessOwnerForm.patchValue({
      business_owner_firts_name: result.business_owner_firts_name,
      business_owner_last_name: result.business_owner_last_name,
      business_owner_email: result.business_owner_email,
      business_owner_number_phone: result.business_owner_number_phone,
      business_owner_birthday: new Date(result.business_owner_birthday),
      business_owner_country: result.business_owner_country,
    });
    return result;
  }

  async Update(): Promise<any> {
    if (!this.BusinessOwnerForm.valid) return this.BusinessOwnerForm.markAllAsTouched();
    const result = await this.businessOwnerService.update_business_owner(this.BusinessOwnerForm.value);
    if(result) {
      this.onBack();
    }
  }

  onBack() {
    this.router.navigate(['/stats'], { replaceUrl: true});
  }
}
