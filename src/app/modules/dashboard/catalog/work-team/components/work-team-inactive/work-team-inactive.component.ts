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
import { WorkTeam } from '../../interfaces/work-team';
import { WorkTeamService } from '../../work-team.service';

@Component({
  selector: 'app-work-team-inactive',
  templateUrl: './work-team-inactive.component.html',
  styleUrls: ['./work-team-inactive.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class WorkTeamInactiveComponent {
  value2!: string;
  name = 'Equipos de trabajo';
  work_team!: WorkTeam[];
  messages!: Message[];

  WorkTeamForm = this.fb.group({
    work_team_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private workteamService: WorkTeamService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getWorkTeam();
  }

  async getWorkTeam(): Promise<WorkTeam[]> {
    const result = await this.workteamService.get_all_inactive_work_team();
    this.work_team = result;
    if (this.work_team.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes equipos de trabajo inactivos.',
        },
      ];
    }
    return result;
  }

  async Active(work_team_uid: string): Promise<any> {
    this.WorkTeamForm.patchValue({
      work_team_is_delete: false,
    });
    await this.workteamService.update_work_team(
      work_team_uid,
      this.WorkTeamForm.value
    );
    this.getWorkTeam();
  }

  async Search(event: any): Promise<any> {
    if (event.target.value.length > 0) {
      const result = await this.workteamService.get_all_inactive_work_team();
      this.filterItems(result, event.target.value);
    } else {
      this.getWorkTeam();
    }
  }

  filterItems(arr: any[], query: string) {
    this.work_team = arr.filter(
      (work_team) =>
        String(work_team.work_team_name)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0
    );
    return this.work_team;
  }

  onWorkTeamEdit(id: string | null | undefined): void {
    this.router.navigate([`dashboard/work-team-form/${id}`]);
  }
}
