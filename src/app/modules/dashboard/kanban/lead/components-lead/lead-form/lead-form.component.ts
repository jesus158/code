import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { Lead } from '../../interfaces/lead';
import { LeadService } from '../../lead.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss'],
})
export class LeadFormComponent {
  visible: boolean = false;
  status_uid!: string;
  lead_uid!: string;
  lead_code_generated!: string;
  lead!: Lead;

  LeadsForm = this.fb.group({
    lead_email: ['', [Validators.required]],
    lead_company: ['', [Validators.required]],
    lead_phone: ['', [Validators.required]],
    lead_expected_income: ['', [Validators.required]],
  });

  LeadsDeleteForm = this.fb.group({
    lead_is_delete: [false],
  });

  GotoCustomerForm = this.fb.group({
    is_customer: [false],
  });

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private leadService: LeadService,
    private location: Location
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.lead_uid = data['lead_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getLead(this.lead_uid);
  }

  async getLead(lead_uid: string | null | undefined): Promise<Lead[]> {
    const result = await this.leadService.get_Lead(lead_uid);
    this.lead = result;

    this.LeadsForm.patchValue({
      lead_email: result.lead_email,
      lead_company: result.lead_company,
      lead_phone: result.lead_phone,
      lead_expected_income: result.lead_expected_income,
    });
    this.lead_code_generated = result.lead_code_generated;
    return result;
  }

  async Update(): Promise<any> {
    if (this.lead_uid) {
      if (!this.LeadsForm.valid) {
        return this.LeadsForm.markAllAsTouched();
      } else {
        const result = await this.leadService.update_lead(
          this.lead_uid,
          this.LeadsForm.value
        );
        this.LeadsForm.reset();
        this.visible = false;
        this.goBack();
        return result;
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
