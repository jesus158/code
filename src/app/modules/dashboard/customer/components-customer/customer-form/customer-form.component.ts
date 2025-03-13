import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Customer } from '../../interfaces/customer';
import { LeadService } from '../../../kanban/lead/lead.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  value1?: string;
  value11: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  customer_uid!: string;
  visible: boolean = false;

  LeadsForm = this.fb.group({
    lead_email: ['', [Validators.required, Validators.email]],
    lead_company: ['', [Validators.required]],
    lead_phone: ['', [Validators.required]],
    lead_expected_income: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private leadService: LeadService
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.customer_uid = data['customer_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.customer_uid) {
      this.getCustomer(this.customer_uid);
    }
  }

  async getCustomer(customer_uid: string): Promise<Customer> {
    const result = await this.leadService.get_Lead(customer_uid);
    this.LeadsForm.patchValue({
      lead_email: result.lead_email,
      lead_company: result.lead_company,
      lead_phone: result.lead_phone,
      lead_expected_income: result.lead_expected_income,
    });
    return result;
  }

  async Save(): Promise<any> {
    if (this.customer_uid) {
      if (!this.LeadsForm.valid) {
        return this.LeadsForm.markAllAsTouched();
      } else {
        const result = await this.leadService.update_lead(
          this.customer_uid,
          this.LeadsForm.value
        );
        this.LeadsForm.reset();
        this.onBack();
        return result;
      }
    } else {
      if (!this.LeadsForm.valid) {
        return this.LeadsForm.markAllAsTouched();
      } else {
        const result = await this.leadService.post_customer(
          this.LeadsForm.value
        );
        this.LeadsForm.reset();
        this.onBack();
        return result;
      }
    }
  }

  onBack() {
    this.router.navigate([`dashboard/customer/active`]);
  }
}
