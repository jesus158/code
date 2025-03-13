import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { LeadService } from '../../lead.service';
import { Lead } from '../../interfaces/lead';

@Component({
  selector: 'app-lead-modal',
  templateUrl: './lead-modal.component.html',
  styleUrls: ['./lead-modal.component.scss'],
})
export class LeadModalComponent {
  visible: boolean = false;
  status_uid!: string;
  lead_uid!: string;

  @Output() RealoadStatus: EventEmitter<any> = new EventEmitter<any>();

  LeadsForm = this.fb.group({
    lead_email: ['', [Validators.required, Validators.email]],
    lead_company: ['', [Validators.required]],
    lead_phone: ['', [Validators.required]],
    lead_expected_income: ['', [Validators.required]],
    business_uid: [''],
    status_uid: [''],
    is_leads: [false],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private leadService: LeadService
  ) {}

  showModalSave(status_uid: string | null | undefined) {
    this.visible = true;
    this.status_uid = String(status_uid);
  }

  async getLead(status_uid: string | null | undefined): Promise<Lead[]> {
    const result = await this.leadService.get_Lead(status_uid);
    this.LeadsForm.patchValue({
      lead_email: result.lead_email,
      lead_company: result.lead_company,
      lead_phone: result.lead_phone,
      lead_expected_income: result.lead_expected_income,
    });
    return result;
  }

  showModalUpdate(status_uid: string | null | undefined) {
    this.status_uid = String(status_uid);
    this.getLead(status_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
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
        this.RealoadStatus.emit();
        return result;
      }
    } else {
      if (!this.LeadsForm.valid) {
        return this.LeadsForm.markAllAsTouched();
      } else {
        this.LeadsForm.patchValue({
          is_leads: true,
        });
        const result = await this.leadService.post_lead(this.LeadsForm.value);
        this.LeadsForm.reset();
        this.visible = false;
        this.RealoadStatus.emit();
        return result;
      }
    }
  }

  onHide() {
    this.LeadsForm.reset();
    this.status_uid = '';
  }
}
