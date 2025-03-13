import { Injectable } from '@angular/core';
import { NotificationsService } from '../../../components-dashboard/shared/notitications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TemplateResponse } from '../response-template/interfaces/response-template';
import { Salesbot } from './interfaces/salesbot';

@Injectable({
  providedIn: 'root',
})
export class SalesbotService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_salesbot(salesbot: Salesbot): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<Salesbot>(
            `${environment.ApiUrl}/salesbot/${db_access}/${business_uid}`,
            salesbot
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

  async update_salesbot(
    salesbot_uid: string,
    salesbot: Salesbot
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<Salesbot>(
            `${environment.ApiUrl}/salesbot/${db_access}/${business_owner}/${business_uid}/${salesbot_uid}`,
            salesbot
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

  async get_all_salesbot(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/salesbot/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_salesbot(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/salesbot/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_salesbot(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/salesbot/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_Salesbot(salesbot_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/salesbot/one/${db_access}/${business_owner}/${business_uid}/${salesbot_uid}`
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
