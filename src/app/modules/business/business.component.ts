import { Component } from '@angular/core';
import { Business } from './interfaces/business';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from './business.service';
import { Message } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent {
  value2!: string;
  name = 'Negocios';
  business!: Business[];
  messages!: Message[];

  BusinessForm = this.fb.group({
    business_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private businessService: BusinessService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getBusiness();
  }

  async getBusiness(): Promise<Business[]> {
    const result = await this.businessService.get_all_business_active();
    this.business = result;
    if (this.business.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes negocios creados.',
        },
      ];
    }
    return result;
  }

  async disableBusiness(business_id: string | null | undefined): Promise<Business[]> {
    this.BusinessForm.patchValue({
      business_is_delete: true,
    });
    const result = await this.businessService.update_business(String(business_id), this.BusinessForm.value);
    this.business = result;
    if (this.business.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes negocios creados.',
        },
      ];
    }
    return result;
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
      // invalid character, prevent input
    }
  }

  async Search(event: any): Promise<any> {
    if (event.target.value.length > 0) {
      const result = await this.businessService.get_all_business();
      this.filterItems(result, event.target.value);
    } else {
      this.getBusiness();
    }
  }

  filterItems(arr: any[], query: string) {
    this.business = arr.filter(
      (business) =>
        String(business.business_name)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0
    );
    return this.business;
  }

  onBusinessForm(): void {
    this.router.navigate([`/business-form`]);
  }

  onBusinessEdit(business: Business): void {
    this.router.navigate([`/business-form/${business.business_uid}`]);
  }

  async GotoBusiness(business_uid: string | null | undefined): Promise<void> {
    const cookie = this.cookieService.get('b_a');
    if (cookie) {
      this.cookieService.delete('/', 'b_a');
      this.cookieService.set('b_a', String(business_uid));
    } else {
      this.cookieService.set('b_a', String(business_uid));
    }
    await this.businessService.get_Business(business_uid);
    this.router.navigate([`/dashboard/stats/business`]);
  }

  onBack() {
    this.router.navigate(['/stats'], {replaceUrl: true});
  }
}
