import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Plans, PlansResponse } from './interfaces/plans';
import { NotificationsService } from 'src/app/modules/dashboard/components-dashboard/shared/notitications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_plans(plans: Plans): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.http.post<Plans>(`${environment.ApiUrl}/plans`, plans)
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

  async update_plans(plans_uid: string, plans: Plans): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.http.put<Plans>(`${environment.ApiUrl}/plans/${plans_uid}`, plans)
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

  async get_all_plans(): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<Plans>(`${environment.ApiUrl}/plans`)
      );
      return data.response;
    } catch (e: any) {
      this.notificationsService.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }

  async get_all_active_plans(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const data = await firstValueFrom(
          this.http.get<PlansResponse>(
            `${environment.ApiUrl}/plans/active/${db_access}`
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

  async get_all_inactive_plans(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const data = await firstValueFrom(
          this.http.get<Plans>(
            `${environment.ApiUrl}/plans/inactive/${db_access}`
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

  async get_Plans(plans_uid: string | null | undefined): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<Plans>(`${environment.ApiUrl}/plans/one/${plans_uid}`)
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
