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
import { Office } from '../../interface/office';
import { OfficeService } from '../../office.service';

@Component({
  selector: 'app-office-active',
  templateUrl: './office-active.component.html',
  styleUrls: ['./office-active.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class OfficeActiveComponent {
  value2!: string;
  name = 'Oficinas';
  office!: Office[];
  messages!: Message[];

  OfficeForm = this.fb.group({
    office_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private officeService: OfficeService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getOffice();
  }

  async getOffice(): Promise<Office[]> {
    const result = await this.officeService.get_all_active_office();
    this.office = result;
    if (this.office.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ninguna oficina creada.',
        },
      ];
    }
    return result;
  }

  async Delete(office_uid: string): Promise<any> {
    this.OfficeForm.patchValue({
      office_is_delete: true,
    });
    await this.officeService.update_office(
      office_uid,
      this.OfficeForm.value
    );
    this.getOffice();
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
      const result = await this.officeService.get_all_active_office();
      this.filterItems(result, event.target.value);
    } else {
      this.getOffice();
    }
  }

  filterItems(arr: any[], query: string) {
    this.office = arr.filter(
      (office) =>
        String(office.office_name).toLowerCase().indexOf(query.toLowerCase()) >=
          0 ||
        String(office.office_number)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0
    );
    return this.office;
  }

  onOfficeForm(): void {
    this.router.navigate([`dashboard/office-form`]);
  }

  onOfficeEdit(id: string | null | undefined): void {
    this.router.navigate([`dashboard/office-form/${id}`]);
  }
}
