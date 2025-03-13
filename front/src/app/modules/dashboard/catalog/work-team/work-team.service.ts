import { Injectable } from '@angular/core';
import { WorkTeam, WorkTeamResponse } from './interfaces/work-team';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotificationsService } from '../../components-dashboard/shared/notitications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class WorkTeamService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_work_team(work_team: WorkTeam): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<WorkTeam>(
            `${environment.ApiUrl}/work-team/${db_access}/${business_uid}`,
            work_team
          )
        );
        if (result) {
          this.notificationsService.Success();
        }
        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.statusCode ? e?.error?.statusCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async update_work_team(
    work_team_uid: string,
    work_team: WorkTeam
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<WorkTeam>(
            `${environment.ApiUrl}/work-team/${db_access}/${business_owner}/${business_uid}/${work_team_uid}`,
            work_team
          )
        );
        this.notificationsService.Update();
        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.statusCode ? e?.error?.statusCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_work_team(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkTeamResponse>(
            `${environment.ApiUrl}/work-team/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.statusCode ? e?.error?.statusCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_inactive_work_team(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkTeamResponse>(
            `${environment.ApiUrl}/work-team/inactive/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.statusCode ? e?.error?.statusCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_active_work_team(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkTeamResponse>(
            `${environment.ApiUrl}/work-team/active/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.statusCode ? e?.error?.statusCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_WorkTeam(work_team_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkTeamResponse>(
            `${environment.ApiUrl}/work-team/one/${db_access}/${business_owner}/${business_uid}/${work_team_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.statusCode ? e?.error?.statusCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }
}
