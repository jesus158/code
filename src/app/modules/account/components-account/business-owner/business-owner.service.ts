import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  BusinessOwner,
  BusinessOwnerResponse,
} from './interfaces/business-owner';
import { environment } from 'src/environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/modules/dashboard/components-dashboard/shared/notitications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessOwnerService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_business_owner(business_owner: BusinessOwner): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.http.post<BusinessOwner>(
          `${environment.ApiUrl}/business-owner`,
          business_owner
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

  async update_business_owner(business_owner: BusinessOwner): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner_uid = this.cookieService.get('u_o');
      await firstValueFrom(this.http.put<BusinessOwner>(`${environment.ApiUrl}/business-owner/${db_access}/${business_owner_uid}`, business_owner));
      this.notificationsService.Update();
      return true;
    } catch (e: any) {
      this.notificationsService.ErrorNotification(e?.error?.statusCode ?? 500, e?.error?.message ?? 'Error connect to server');
      return false;
    }
  }

  async get_business_owner(): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const business_owner = this.cookieService.get('u_o');
      const data = await firstValueFrom(
        this.http.get<BusinessOwnerResponse>(
          `${environment.ApiUrl}/business-owner/one/${db_access}/${business_owner}`
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
