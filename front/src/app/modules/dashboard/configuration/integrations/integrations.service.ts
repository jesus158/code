import { Injectable } from '@angular/core';
import { NotificationsService } from '../../components-dashboard/shared/notitications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Integrations } from './interfaces/integrations';
import { Icategory } from './interfaces/icategory';

@Injectable({
  providedIn: 'root',
})
export class IntegrationsService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_integration(
    category_uid: string,
    integration: Integrations
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<Integrations>(
            `${environment.ApiUrl}/integration/${db_access}/${category_uid}`,
            integration
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

  async update_integration(
    integration_uid: string | null | undefined,
    integration: Integrations
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<Integrations>(
            `${environment.ApiUrl}/integration/${db_access}/${business_owner}/${business_uid}/${integration_uid}`,
            integration
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

  async get_all_integration(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<Icategory>(
            `${environment.ApiUrl}/integration/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_integration(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<Integrations>(
            `${environment.ApiUrl}/integration/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_integration(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<Integrations>(
            `${environment.ApiUrl}/integration/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_Integrations(
    integration_uid: string | null | undefined
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<Integrations>(
            `${environment.ApiUrl}/integration/one/${db_access}/${business_owner}/${business_uid}/${integration_uid}`
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

  async get_all_active_category(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<Integrations>(
            `${environment.ApiUrl}/icategory/active/${db_access}/${business_owner}/${business_uid}`
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
