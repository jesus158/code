import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User, UserResponse } from './interfaces/user';
import { NotificationsService } from 'src/app/modules/dashboard/components-dashboard/shared/notitications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_user(user: User): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_owner) {
      try {
        const result = await firstValueFrom(
          this.http.post<User>(
            `${environment.ApiUrl}/user/${db_access}/${business_owner}`,
            user
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

  async update_user(user_uid: string, user: User): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_owner) {
      try {
        const result = await firstValueFrom(
          this.http.put<User>(
            `${environment.ApiUrl}/user/${user_uid}/${db_access}/${business_owner}`,
            user
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

  async get_all_user(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_owner) {
      try {
        const data = await firstValueFrom(
          this.http.get<UserResponse>(
            `${environment.ApiUrl}/user/${db_access}/${business_owner}`
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

  async get_all_inactive_user(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_owner) {
      try {
        const data = await firstValueFrom(
          this.http.get<UserResponse>(
            `${environment.ApiUrl}/user/inactive/${db_access}/${business_owner}`
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

  async get_all_active_user(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_owner) {
      try {
        const data = await firstValueFrom(
          this.http.get<UserResponse>(
            `${environment.ApiUrl}/user/${db_access}/${business_owner}`
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

  async get_User(user_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_owner) {
      try {
        const data = await firstValueFrom(
          this.http.get<UserResponse>(
            `${environment.ApiUrl}/user/one/${db_access}/${business_owner}/${user_uid}`
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
