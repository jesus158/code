import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  selector: 'app-work-team-active',
  templateUrl: './work-team-active.component.html',
  styleUrls: ['./work-team-active.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class WorkTeamActiveComponent {
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
    const result = await this.workteamService.get_all_active_work_team();
    this.work_team = result;
    if (this.work_team.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes equipos de trabajo creados.',
        },
      ];
    }
    return result;
  }

  async Delete(work_team_uid: string): Promise<any> {
    this.WorkTeamForm.patchValue({
      work_team_is_delete: true,
    });
    await this.workteamService.update_work_team(
      work_team_uid,
      this.WorkTeamForm.value
    );
    this.getWorkTeam();
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
      const result = await this.workteamService.get_all_active_work_team();
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
