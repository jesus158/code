import { Injectable } from '@angular/core';
import { Staff, StaffResponse } from './interfaces/staff';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotificationsService } from '../../components-dashboard/shared/notitications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_staff(staff: Staff): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(this.http.post<Staff>(`${environment.ApiUrl}/staff/${db_access}/${business_uid}`, staff));
        this.notificationsService.Success();
        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(e?.error?.statusCode ? e?.error?.statusCode : 500, e?.error?.message ? e?.error?.message : 'Error connect to server');
      }
    }
  }

  async update_staff(staff_uid: string, staff: Staff): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(this.http.put<Staff>(`${environment.ApiUrl}/staff/${db_access}/${business_owner}/${business_uid}/${staff_uid}`,staff));
        this.notificationsService.Update();
        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(e?.error?.statusCode ? e?.error?.statusCode : 500, e?.error?.message ? e?.error?.message : 'Error connect to server');
      }
    }
  }

  async get_all_staff(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StaffResponse>(
            `${environment.ApiUrl}/staff/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_staff(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StaffResponse>(
            `${environment.ApiUrl}/staff/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_staff(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StaffResponse>(
            `${environment.ApiUrl}/staff/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_Staff(staff_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<StaffResponse>(
            `${environment.ApiUrl}/staff/one/${db_access}/${business_owner}/${business_uid}/${staff_uid}`
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
