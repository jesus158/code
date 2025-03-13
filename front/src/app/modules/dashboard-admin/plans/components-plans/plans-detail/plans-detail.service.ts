import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/modules/dashboard/components-dashboard/shared/notitications/notifications.service';
import { environment } from 'src/environments/environment.development';
import { PlansDetail, PlansDetailResponse } from './interfaces/plans-detail';

@Injectable({
  providedIn: 'root',
})
export class PlansDetailDetailService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_plans_detail(
    plans_uid: string | undefined | null,
    plans_detail: PlansDetail
  ): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.http.post<PlansDetail>(
          `${environment.ApiUrl}/plans-detail/${plans_uid}`,
          plans_detail
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

  async update_plans_detail(
    plans_detail_uid: string,
    plans_detail: PlansDetail
  ): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.http.put<PlansDetail>(
          `${environment.ApiUrl}/plans-detail/${plans_detail_uid}`,
          plans_detail
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

  async get_all_plans_detail(): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<PlansDetailResponse>(`${environment.ApiUrl}/plans-detail`)
      );
      return data.response;
    } catch (e: any) {
      this.notificationsService.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }

  async get_all_active_plans_detail(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const data = await firstValueFrom(
          this.http.get<PlansDetailResponse>(
            `${environment.ApiUrl}/plans-detail/active/${db_access}`
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

  async get_all_inactive_plans_detail(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const data = await firstValueFrom(
          this.http.get<PlansDetailResponse>(
            `${environment.ApiUrl}/plans-detail/inactive/${db_access}`
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

  async get_PlansDetail(
    plans_detail_uid: string | null | undefined
  ): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<PlansDetailResponse>(
          `${environment.ApiUrl}/plans-detail/one/${plans_detail_uid}`
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
