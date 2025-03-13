import { Injectable } from '@angular/core';
import { Workstation, WorkstationResponse } from './interfaces/workstation';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotificationsService } from '../../components-dashboard/shared/notitications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_workstation(workstation: Workstation): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<Workstation>(
            `${environment.ApiUrl}/workstation/${db_access}/${business_uid}`,
            workstation
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

  async update_workstation(
    workstation_uid: string,
    workstation: Workstation
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<Workstation>(
            `${environment.ApiUrl}/workstation/${db_access}/${business_owner}/${business_uid}/${workstation_uid}`,
            workstation
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

  async get_all_workstation(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkstationResponse>(
            `${environment.ApiUrl}/workstation/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_workstation(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkstationResponse>(
            `${environment.ApiUrl}/workstation/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_workstation(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkstationResponse>(
            `${environment.ApiUrl}/workstation/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_Workstation(
    workstation_uid: string | null | undefined
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<WorkstationResponse>(
            `${environment.ApiUrl}/workstation/one/${db_access}/${business_owner}/${business_uid}/${workstation_uid}`
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
