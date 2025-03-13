import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { KanbanStatus } from '../../interfaces/kanban-status';
import { LeadsService } from '../../../../leads.service';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-to-do-list-modal',
  templateUrl: './to-do-list-modal.component.html',
  styleUrls: ['./to-do-list-modal.component.scss'],
})
export class ToDoListModalComponent {
  visible: boolean = false;
  kanban_status_uid!: string;
  leads_uid!: string;

  @Output() RealoadLeads: EventEmitter<any> = new EventEmitter<any>();

  LeadsForm = this.fb.group({
    leads_email: ['', [Validators.required]],
    leads_company: ['', [Validators.required]],
    leads_office_phone: ['', [Validators.required]],
    leads_expected_income: ['', [Validators.required]],
    business_uid: [''],
    kanban_status_uid: [''],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private leadsService: LeadsService
  ) {}

  showModalSave(kanban_status_uid: string | null | undefined) {
    this.visible = true;
    this.kanban_status_uid = String(kanban_status_uid);
  }

  async getKanbanStatus(
    kanban_status_uid: string | null | undefined
  ): Promise<KanbanStatus[]> {
    const result = await this.leadsService.get_Leads(kanban_status_uid);
    this.LeadsForm.patchValue({
      leads_email: result.leads_email,
      leads_company: result.leads_company,
      leads_office_phone: result.leads_office_phone,
      leads_expected_income: result.leads_expected_income,
    });
    return result;
  }

  showModalUpdate(kanban_status_uid: string | null | undefined) {
    this.kanban_status_uid = String(kanban_status_uid);
    this.getKanbanStatus(kanban_status_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (this.leads_uid) {
      if (!this.LeadsForm.valid) {
        return this.LeadsForm.markAllAsTouched();
      } else {
        const result = await this.leadsService.update_lead(
          this.kanban_status_uid,
          this.LeadsForm.value
        );
        this.LeadsForm.reset();
        this.visible = false;
        this.RealoadLeads.emit();
        return result;
      }
    } else {
      if (!this.LeadsForm.valid) {
        return this.LeadsForm.markAllAsTouched();
      } else {
        this.LeadsForm.patchValue({
          kanban_status_uid: this.kanban_status_uid,
        });
        const result = await this.leadsService.post_lead(this.LeadsForm.value);
        this.LeadsForm.reset();
        this.visible = false;
        this.RealoadLeads.emit();
        return result;
      }
    }
  }

  onHide() {
    this.LeadsForm.reset();
    this.kanban_status_uid = '';
  }
}
