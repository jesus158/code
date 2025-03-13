import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Office } from '../../interface/office';
import { OfficeService } from '../../office.service';
import { UserService } from 'src/app/modules/account/components-account/user/user.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss'],
})
export class OfficeFormComponent {
  value1?: string;
  value11: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  office_uid!: string;
  visible: boolean = false;
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUser: any;
  userModel: any;

  OfficeForm = this.fb.group({
    office_name: ['', [Validators.required]],
    office_number: ['', [Validators.required]],
    office_location: ['', [Validators.required]],
    office_observations: [''],
    userUserUid: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private officeService: OfficeService,
    private userService: UserService
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.office_uid = data['office_uid'])
    );
  }

  ngOnInit(): void {
    this.getUsers();
    this.primengConfig.ripple = true;
    if (this.office_uid) {
      this.getOffice(this.office_uid);
    }
  }

  async getOffice(office_uid: string): Promise<Office> {
    const result = await this.officeService.get_Office(office_uid);
    this.OfficeForm.patchValue(result[0]);
    this.userModel = result[0].user;
    return result;
  }

  async Save(): Promise<any> {
    if(this.userModel?.user_uid) this.OfficeForm.get('userUserUid')?.setValue(this.userModel?.user_uid)
    if (this.office_uid) {
      if (!this.OfficeForm.valid) {
        return this.OfficeForm.markAllAsTouched();
      } else {
        const result = await this.officeService.update_office(
          this.office_uid,
          this.OfficeForm.value
        );
        this.OfficeForm.reset();
        this.onBack();
        return result;
      }
    } else {
      if (!this.OfficeForm.valid) {
        return this.OfficeForm.markAllAsTouched();
      } else {
        const result = await this.officeService.post_office(
          this.OfficeForm.value
        );
        this.OfficeForm.reset();
        this.onBack();
        return result;
      }
    }
  }

  filterUser(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.users as any[]).length; i++) {
      let user = (this.users as any[])[i];
      if (user.user_name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(user);
      }
    }
    this.filteredUsers = filtered;
  }

  onBack() {
    this.router.navigate([`dashboard/office`]);
  }

  private async getUsers() {
    await this.userService.get_all_user().then(data => {
      this.users = data.map((user: any) => {
        const { business_owner, ...data} = user;
        return {...data}
      });
    });
  }
}
