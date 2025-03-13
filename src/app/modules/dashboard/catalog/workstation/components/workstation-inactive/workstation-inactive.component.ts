import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Message,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { Workstation } from '../../interfaces/workstation';
import { WorkstationService } from '../../workstation.service';

@Component({
  selector: 'app-workstation-inactive',
  templateUrl: './workstation-inactive.component.html',
  styleUrls: ['./workstation-inactive.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class WorkstationInactiveComponent {
  value2!: string;
  name = 'Puestos de trabajo';
  workstation!: Workstation[];
  messages!: Message[];

  WorkstationForm = this.fb.group({
    workstation_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private workstationService: WorkstationService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getWorkstation();
  }

  async getWorkstation(): Promise<Workstation[]> {
    const result = await this.workstationService.get_all_inactive_workstation();
    this.workstation = result;
    if (this.workstation.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes puestos de trabajo inactivos.',
        },
      ];
    }
    return result;
  }

  async Active(workstation: string): Promise<any> {
    this.WorkstationForm.patchValue({
      workstation_is_delete: false,
    });
    await this.workstationService.update_workstation(
      workstation,
      this.WorkstationForm.value
    );
    this.getWorkstation();
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
      const result = await this.workstationService.get_all_active_workstation();
      this.filterItems(result, event.target.value);
    } else {
      this.getWorkstation();
    }
  }

  filterItems(arr: any[], query: string) {
    this.workstation = arr.filter(
      (workstation) =>
        String(workstation.workstation_description)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0
    );
    return this.workstation;
  }
}
