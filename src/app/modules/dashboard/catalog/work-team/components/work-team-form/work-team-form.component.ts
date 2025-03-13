import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { WorkTeam } from '../../interfaces/work-team';
import { WorkTeamService } from '../../work-team.service';

@Component({
  selector: 'app-work-team-form',
  templateUrl: './work-team-form.component.html',
  styleUrls: ['./work-team-form.component.scss'],
})
export class WorkTeamFormComponent {
  work_team_uid!: string;

  WorkTeamForm = this.fb.group({
    work_team_name: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private workteamService: WorkTeamService
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.work_team_uid = data['work_team_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.work_team_uid) {
      this.getWorkTeam(this.work_team_uid);
    }
  }

  async getWorkTeam(work_team_uid: string): Promise<WorkTeam> {
    const result = await this.workteamService.get_WorkTeam(work_team_uid);
    this.WorkTeamForm.patchValue({
      work_team_name: result[0].work_team_name,
    });
    return result;
  }

  async Save(): Promise<any> {
    if (this.work_team_uid) {
      if (!this.WorkTeamForm.valid) {
        return this.WorkTeamForm.markAllAsTouched();
      } else {
        const result = await this.workteamService.update_work_team(
          this.work_team_uid,
          this.WorkTeamForm.value
        );
        this.WorkTeamForm.reset();
        this.onBack();
        return result;
      }
    } else {
      if (!this.WorkTeamForm.valid) {
        return this.WorkTeamForm.markAllAsTouched();
      } else {
        const result = await this.workteamService.post_work_team(
          this.WorkTeamForm.value
        );
        this.WorkTeamForm.reset();
        this.onBack();
        return result;
      }
    }
  }

  onBack() {
    this.router.navigate([`dashboard/work-team`]);
  }
}
