import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/modules/dashboard/components-dashboard/shared/notitications/notifications.service';
import { environment } from 'src/environments/environment.development';
import { SubscriptionResponse } from './interfaces/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_subscription(subscription: Subscription): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<Subscription>(
            `${environment.ApiUrl}/subscription/${db_access}/${business_uid}`,
            subscription
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

  async update_subscription(
    subscription_uid: string,
    subscription: Subscription
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<Subscription>(
            `${environment.ApiUrl}/subscription/${subscription_uid}/${db_access}/${business_uid}`,
            subscription
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

  async get_all_subscription(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<SubscriptionResponse>(
            `${environment.ApiUrl}/subscription/${db_access}/${business_uid}`
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

  async get_all_active_subscription(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<SubscriptionResponse>(
            `${environment.ApiUrl}/subscription/active/${db_access}/${business_uid}`
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

  async get_all_inactive_subscription(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<SubscriptionResponse>(
            `${environment.ApiUrl}/subscription/inactive/${db_access}/${business_uid}`
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

  async get_Subscription(
    subscription_uid: string | null | undefined
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<SubscriptionResponse>(
            `${environment.ApiUrl}/subscription/one/${db_access}/${subscription_uid}/${business_uid}`
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
