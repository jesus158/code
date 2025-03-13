import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { Workstation } from '../../../workstation/interfaces/workstation';
import { WorkstationService } from '../../../workstation/workstation.service';
import { Staff } from '../../interfaces/staff';
import { StaffService } from '../../staff.service';
import { WorkTeamService } from '../../../work-team/work-team.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
})
export class StaffFormComponent {
  value1?: string;
  value11: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  staff_uid!: string;
  visible: boolean = false;
  workstation!: Workstation[];
  workTeams: any = [];
  workstationModel!: any;
  workTeamModel!: any;
  workstation_name!: string;
  staff_birthday!: Date;
  editing = false;

  StaffForm = this.fb.group({
    staff_name: ['', [Validators.required]],
    staff_last_name: ['', [Validators.required]],
    staff_number_phone: [null, [Validators.required]],
    staff_age: [null, [Validators.required]],
    staff_birthday: ['', [Validators.required]],
    staff_address: ['', [Validators.required]],
    staff_email: ['', [Validators.required, Validators.email]],
    workstationWorkstationUid: ['', Validators.required],
    workTeamWorkTeamUid: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private staffService: StaffService,
    private workstationService: WorkstationService,
    private workteamService: WorkTeamService,
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.staff_uid = data['staff_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.staff_uid) {
      this.getStaff(this.staff_uid);
    }
    this.getWorkstation();
    this.getWorkTeam();
  }

  async getWorkTeam() {
    this.workTeams = await this.workteamService.get_all_active_work_team();
  }

  async getWorkstation(): Promise<Staff> {
    const result = await this.workstationService.get_all_active_workstation();
    this.workstation = result;
    return result;
  }

  async getStaff(staff_uid: string) {
    const result = await this.staffService.get_Staff(staff_uid);
    console.log(result);
    this.StaffForm.patchValue(result[0]);
    this.workTeamModel = result[0].work_team;
    this.workstationModel = result[0].workstation;
    return result;
  }

  async Save(): Promise<any> {
    if(this.workTeamModel?.work_team_uid) this.StaffForm.get('workTeamWorkTeamUid')?.setValue(this.workTeamModel?.work_team_uid);
    if(this.workstationModel?.workstation_uid) this.StaffForm.get('workstationWorkstationUid')?.setValue(this.workstationModel?.workstation_uid);
    if (this.staff_uid) {
      if (!this.StaffForm.valid) {
        return this.StaffForm.markAllAsTouched();
      } else {
        const result = await this.staffService.update_staff(this.staff_uid, this.StaffForm.value);
        this.StaffForm.reset();
        this.onBack();
        return result;
      }
    } else {
      if (!this.StaffForm.valid) {
        console.log('no válidado', this.StaffForm.value);
        return this.StaffForm.markAllAsTouched();
      } else {
        const result = await this.staffService.post_staff(this.StaffForm.value);
        this.StaffForm.reset();
        this.onBack();
        return result;
      }
    }
  }

  onBack() {
    this.router.navigate([`dashboard/staff`]);
  }
}
