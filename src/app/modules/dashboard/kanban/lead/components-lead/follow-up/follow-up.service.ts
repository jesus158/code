import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/modules/dashboard/components-dashboard/shared/notitications/notifications.service';
import { environment } from 'src/environments/environment.development';
import { FollowUp, FollowUpResponse } from './interfaces/follow-up';

@Injectable({
  providedIn: 'root',
})
export class FollowUpService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_follow_up(lead_uid: string, follow_up: FollowUp): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const result = await firstValueFrom(
          this.http.post<FollowUp>(
            `${environment.ApiUrl}/follow-up/${db_access}/${lead_uid}`,
            follow_up
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

  async update_follow_up(follow_up_uid: string | null | undefined, follow_up: FollowUp): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<FollowUp>(
            `${environment.ApiUrl}/follow-up/${db_access}/${business_owner}/${business_uid}/${follow_up_uid}`,
            follow_up
          )
        );
        this.notificationsService.Update();
        return result;
      } catch (e: any) {
        const error = e?.error?.statusCode ? e?.error?.statusCode : 500;
        const message = e?.error?.message ? e?.error?.message : 'Error connect to server';
        this.notificationsService.ErrorNotification(error, message);
      }
    }
  }

  async get_all_follow_up(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FollowUpResponse>(
            `${environment.ApiUrl}/follow-up/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_follow_up(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FollowUpResponse>(
            `${environment.ApiUrl}/follow-up/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_follow_up(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FollowUpResponse>(
            `${environment.ApiUrl}/follow-up/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_FollowUp(follow_up_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FollowUpResponse>(
            `${environment.ApiUrl}/follow-up/one/${db_access}/${business_owner}/${business_uid}/${follow_up_uid}`
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
