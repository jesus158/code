import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  Message,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Staff } from '../../interfaces/staff';
import { StaffService } from '../../staff.service';

@Component({
  selector: 'app-staff-active',
  templateUrl: './staff-active.component.html',
  styleUrls: ['./staff-active.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class StaffActiveComponent {
  value2!: string;
  name = 'Personal';
  staff!: Staff[];
  messages!: Message[];

  StaffForm = this.fb.group({
    staff_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private staffService: StaffService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getStaff();
  }

  async getStaff(): Promise<Staff[]> {
    const result = await this.staffService.get_all_active_staff();
    this.staff = result;
    if (this.staff.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes información creada.',
        },
      ];
    }
    return result;
  }

  async Delete(staff_uid: string): Promise<any> {
    this.StaffForm.patchValue({
      staff_is_delete: true,
    });
    await this.staffService.update_staff(staff_uid, this.StaffForm.value);
    this.getStaff();
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
      const result = await this.staffService.get_all_active_staff();
      this.filterItems(result, event.target.value);
    } else {
      this.getStaff();
    }
  }

  filterItems(arr: any[], query: string) {
    this.staff = arr.filter(
      (staff) =>
        String(staff.staff_name).toLowerCase().indexOf(query.toLowerCase()) >=
          0 ||
        String(staff.staff_last_name)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0 ||
        String(staff.staff_number_phone)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0 ||
        String(staff.staff_email).toLowerCase().indexOf(query.toLowerCase()) >=
          0
    );
    return this.staff;
  }

  onStaffEdit(id: string | null | undefined): void {
    this.router.navigate([`dashboard/staff-form/${id}`]);
  }
}
