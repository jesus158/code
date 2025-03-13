import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NotificationsService } from '../../components-dashboard/shared/notitications/notifications.service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Status, StatusResponse } from './interfaces/status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_status(status: Status): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<Status>(
            `${environment.ApiUrl}/status/${db_access}/${business_uid}`,
            status
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

  async update_status(status_uid: string, status: Status): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<Status>(
            `${environment.ApiUrl}/status/${db_access}/${business_owner}/${business_uid}/${status_uid}`,
            status
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

  async get_all_status(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StatusResponse>(
            `${environment.ApiUrl}/status/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_status(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StatusResponse>(
            `${environment.ApiUrl}/status/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_status(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StatusResponse>(
            `${environment.ApiUrl}/status/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_status_f(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StatusResponse>(
            `${environment.ApiUrl}/status/follow-up/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_status_f(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StatusResponse>(
            `${environment.ApiUrl}/status/follow-up/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_Status(status_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StatusResponse>(
            `${environment.ApiUrl}/status/one/${db_access}/${business_owner}/${business_uid}/${status_uid}`
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
