import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  Message,
  PrimeNGConfig,
  ConfirmEventType,
} from 'primeng/api';
import { Leads } from '../../interfaces/leads';
import { LeadsService } from '../../leads.service';

@Component({
  selector: 'app-leads-active',
  templateUrl: './leads-active.component.html',
  styleUrls: ['./leads-active.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class LeadsActiveComponent {
  value2!: string;
  name = 'Leads';
  leads!: Leads[];
  messages!: Message[];
  message!: string;

  LeadsForm = this.fb.group({
    leads_is_delete: [false],
    is_customer: [false],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private leadsService: LeadsService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getLeads();
  }

  async getLeads(): Promise<Leads[]> {
    const result = await this.leadsService.get_all_active_lead();
    this.leads = result;
    if (this.leads?.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ningún leads generado.',
        },
      ];
    }
    return result;
  }

  update_lead_to_customer(leads_uid: string): void {
    this.message = '¿Estás seguro que deseas pasar a cliente?';
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.LeadsForm.patchValue({
          is_customer: true,
        });
        await this.leadsService.update_lead_to_customer(
          leads_uid,
          this.LeadsForm.value
        );
        this.getLeads();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  async Delete(leads_uid: string): Promise<any> {
    this.message =
      '¿Estás seguro que deseas desactivar la siguiente información?';
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.LeadsForm.patchValue({
          leads_is_delete: true,
        });
        await this.leadsService.update_lead(leads_uid, this.LeadsForm.value);
        this.getLeads();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
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
      const result = await this.leadsService.get_all_active_lead();
      this.filterItems(result, event.target.value);
    } else {
      this.getLeads();
    }
  }

  filterItems(arr: any[], query: string) {
    this.leads = arr.filter(
      (leads) =>
        String(leads.leads_name).toLowerCase().indexOf(query.toLowerCase()) >=
          0 ||
        String(leads.leads_number).toLowerCase().indexOf(query.toLowerCase()) >=
          0
    );
    return this.leads;
  }

  onLeadsForm(): void {
    this.router.navigate([`dashboard/lead/leads-form`]);
  }

  onLeadsEdit(id: string | null | undefined): void {
    this.router.navigate([`dashboard/lead/leads-form/${id}`]);
  }
}
