import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Workstation } from '../../interfaces/workstation';
import { WorkstationService } from '../../workstation.service';

@Component({
  selector: 'app-workstation-form',
  templateUrl: './workstation-form.component.html',
  styleUrls: ['./workstation-form.component.scss'],
})
export class WorkstationFormComponent {
  workstation_uid!: string;

  WorkstationForm = this.fb.group({
    workstation_description: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private workstationService: WorkstationService
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.workstation_uid = data['workstation_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.workstation_uid) {
      this.getWorkstation(this.workstation_uid);
    }
  }

  async getWorkstation(workstation_uid: string): Promise<Workstation> {
    const result = await this.workstationService.get_Workstation(
      workstation_uid
    );
    this.WorkstationForm.patchValue({
      workstation_description: result[0].workstation_description,
    });
    return result;
  }

  async Save(): Promise<any> {
    if (this.workstation_uid) {
      if (!this.WorkstationForm.valid) {
        return this.WorkstationForm.markAllAsTouched();
      } else {
        const result = await this.workstationService.update_workstation(
          this.workstation_uid,
          this.WorkstationForm.value
        );
        this.WorkstationForm.reset();
        this.onBack();
        return result;
      }
    } else {
      if (!this.WorkstationForm.valid) {
        return this.WorkstationForm.markAllAsTouched();
      } else {
        const result = await this.workstationService.post_workstation(
          this.WorkstationForm.value
        );
        this.WorkstationForm.reset();
        this.onBack();
        return result;
      }
    }
  }

  onBack() {
    this.router.navigate([`dashboard/workstation`]);
  }
}
