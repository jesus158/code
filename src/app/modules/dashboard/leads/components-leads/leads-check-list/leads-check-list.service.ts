import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotificationsService } from '../../../components-dashboard/shared/notitications/notifications.service';
import { LeadsCheckList } from './interfaces/leads-check-list';

@Injectable({
  providedIn: 'root',
})
export class LeadsCheckListService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_leads_check_list(
    leads_uid: string,
    leads_check_list: LeadsCheckList
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<LeadsCheckList>(
            `${environment.ApiUrl}/leads-check-list/${db_access}/${business_uid}/${leads_uid}`,
            leads_check_list
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

  async update_leads_check_list(
    leads_uid: string,
    leads_check_list_uid: string | null | undefined,
    leads_check_list: LeadsCheckList
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<LeadsCheckList>(
            `${environment.ApiUrl}/leads-check-list/${leads_check_list_uid}/${db_access}/${business_uid}/${leads_uid}`,
            leads_check_list
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

  async update_leads_check_list_kanban_status(
    leads_uid: string,
    leads_check_list_uid: string | null | undefined,
    leads_check_list: LeadsCheckList
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<LeadsCheckList>(
            `${environment.ApiUrl}/leads-check-list/${leads_check_list_uid}/${db_access}/${business_uid}/${leads_uid}`,
            leads_check_list
          )
        );

        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.statusCode ? e?.error?.statusCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_leads_check_list(leads_uid: string): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadsCheckList>(
            `${environment.ApiUrl}/leads-check-list/${db_access}/${business_uid}/${leads_uid}`
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

  async get_all_inactive_leads_check_list(leads_uid: string): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadsCheckList>(
            `${environment.ApiUrl}/leads-check-list/inactive/${db_access}/${business_uid}/${leads_uid}`
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

  async get_all_active_leads_check_list(leads_uid: string): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadsCheckList>(
            `${environment.ApiUrl}/leads-check-list/active/${db_access}/${business_uid}/${leads_uid}`
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

  async get_LeadsCheckList(
    leads_uid: string,
    leads_check_list_uid: string | null | undefined
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadsCheckList>(
            `${environment.ApiUrl}/leads-check-list/one/${db_access}/${leads_check_list_uid}/${business_uid}/${leads_uid}`
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
