import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Business, BusinessResponse } from './interfaces/business';
import { NotificationsService } from '../dashboard/components-dashboard/shared/notitications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_business(business: Business): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      await firstValueFrom(this.http.post<Business>(`${environment.ApiUrl}/business/${db_access}/${business_owner}`, business));
      this.notificationsService.Success();
      return true;
    } catch (e: any) {
      this.notificationsService.ErrorNotification(e?.error?.statusCode ?? 500, e?.error?.message ?? 'Error connect to server');
      return false;
    }
  }

  async update_business(
    business_uid: string,
    business: Business
  ): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const result = await firstValueFrom(
        this.http.put<Business>(
          `${environment.ApiUrl}/business/${db_access}/${business_owner}/${business_uid}`,
          business
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

  async get_all_business(): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const data = await firstValueFrom(
        this.http.get<BusinessResponse>(
          `${environment.ApiUrl}/business/${db_access}/${business_owner}`
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

  async get_last_five_business(): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const data = await firstValueFrom(
        this.http.get<BusinessResponse>(
          `${environment.ApiUrl}/business/five/${db_access}/${business_owner}`
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

  async get_all_business_active(): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const data = await firstValueFrom(
        this.http.get<BusinessResponse>(
          `${environment.ApiUrl}/business/active/${db_access}/${business_owner}`
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

  async get_all_business_inactive(): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const data = await firstValueFrom(
        this.http.get<BusinessResponse>(
          `${environment.ApiUrl}/business/inactive/${db_access}/${business_owner}`
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

  async get_Business(business_uid: string | null | undefined): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const data = await firstValueFrom(
        this.http.get<BusinessResponse>(
          `${environment.ApiUrl}/business/one/${db_access}/${business_owner}/${business_uid}`
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

  async get_business_comm_tools(
    business_uid: string | null | undefined
  ): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const data = await firstValueFrom(
        this.http.get<BusinessResponse>(
          `${environment.ApiUrl}/business/one/comm_tools/${db_access}/${business_owner}/${business_uid}`
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
