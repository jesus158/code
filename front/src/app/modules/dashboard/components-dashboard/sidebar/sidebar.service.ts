import { Injectable } from '@angular/core';
import { NotificationsService } from '../shared/notitications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import {
  MainModules,
  MainModulesResponse,
} from 'src/app/modules/dashboard-admin/main-modules/interfaces/main-modules';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_main_modules(main_modules: MainModules): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<MainModules>(
            `${environment.ApiUrl}/main-modules/${db_access}/${business_uid}`,
            main_modules
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

  async update_main_modules(
    main_modules_uid: string,
    main_modules: MainModules
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('b_o_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<MainModules>(
            `${environment.ApiUrl}/main-modules/${db_access}/${business_owner}/${business_uid}/${main_modules_uid}`,
            main_modules
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

  async get_all_main_modules(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('b_o_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<MainModulesResponse>(
            `${environment.ApiUrl}/main-modules/${db_access}/${business_owner}/${business_uid}`
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

  async get_MainModules(
    main_modules_uid: string | null | undefined
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('b_o_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<MainModulesResponse>(
            `${environment.ApiUrl}/main-modules/one/${db_access}/${business_owner}/${business_uid}/${main_modules_uid}`
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
