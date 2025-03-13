import { Component } from '@angular/core';
import { Integrations } from './interfaces/integrations';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Message,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { IntegrationsService } from './integrations.service';
import { Icategory } from './interfaces/icategory';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss'],
})
export class IntegrationsComponent {
  value2!: string;
  name = 'Integraciones';
  integrations!: Icategory[];
  messages!: Message[];

  IntegrationsForm = this.fb.group({
    is_instaled: [false],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private integrationsService: IntegrationsService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getIntegrations();
  }

  async getIntegrations(): Promise<Integrations[]> {
    const result = await this.integrationsService.get_all_active_category();
    this.integrations = result;
    return result;
  }

  async Update(integrations_uid: string | null | undefined): Promise<any> {
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.IntegrationsForm.patchValue({
          is_instaled: true,
        });
        await this.integrationsService.update_integration(
          integrations_uid,
          this.IntegrationsForm.value
        );
        this.getIntegrations();
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
      const result =
        await this.integrationsService.get_all_active_integration();
    } else {
      this.getIntegrations();
    }
  }

  /* filterItems(arr: any[], query: string) {
    this.integrations = arr.filter(
      (integrations) =>
        String(integrations.integrations_name)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0 ||
        String(integrations.integrations_number)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0
    );
    return this.integrations;
  } */

  onIntegrationsForm(): void {
    this.router.navigate([`dashboard/catalog/integrations-form`]);
  }

  onIntegrationsEdit(id: string | null | undefined): void {
    this.router.navigate([`dashboard/catalog/integrations-form/${id}`]);
  }
}
