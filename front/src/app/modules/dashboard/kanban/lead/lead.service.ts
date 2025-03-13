import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NotificationsService } from '../../components-dashboard/shared/notitications/notifications.service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Lead, LeadResponse } from './interfaces/lead';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_lead(lead: Lead): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const result = await firstValueFrom(
          this.http.post<Lead>(`${environment.ApiUrl}/lead/${db_access}`, lead)
        );
        if (result) {
          this.notificationsService.Success();
        }
        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async post_customer(lead: Lead): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const result = await firstValueFrom(this.http.post<Lead>(`${environment.ApiUrl}/lead/customer/${db_access}`, lead));
        if (result) {
          this.notificationsService.Success();
        }
        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async update_lead(lead_uid: string | null | undefined, lead: Lead | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(this.http.put<Lead>(`${environment.ApiUrl}/lead/${db_access}/${business_owner}/${business_uid}/${lead_uid}`, lead));
        this.notificationsService.Update();
        return result;
      } catch (e: any) {
        const status = e?.error?.statusCode ? e?.error?.statusCode : 500;
        const message = e?.error?.message ? e?.error?.message : 'Error connect to server';
        this.notificationsService.ErrorNotification(status, message);
      }
    }
  }

  async update_inactive_lead(lead_uid: string | null | undefined, lead: Lead | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(this.http.put<Lead>(`${environment.ApiUrl}/lead/to_inactive/${db_access}/${business_owner}/${business_uid}/${lead_uid}`, lead));
        this.notificationsService.Update();
        return result;
      } catch (e: any) {
        const status = e?.error?.statusCode ? e?.error?.statusCode : 500;
        const message = e?.error?.message ? e?.error?.message : 'Error connect to server';
        this.notificationsService.ErrorNotification(status, message);
      }
    }
  }

  async to_customer(
    lead_uid: string | null | undefined,
    lead: Lead | null | undefined
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<Lead>(`${environment.ApiUrl}/lead/to_customer/${db_access}/${business_owner}/${business_uid}/${lead_uid}`, lead));
        /* this.notificationsService.Update(); */
        return result;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_lead(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadResponse>(
            `${environment.ApiUrl}/lead/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_customers(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadResponse>(
            `${environment.ApiUrl}/lead/customer/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_active_lead(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadResponse>(
            `${environment.ApiUrl}/lead/active/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_inactive_lead(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadResponse>(
            `${environment.ApiUrl}/lead/inactive/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_active_customer(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadResponse>(
            `${environment.ApiUrl}/lead/customer/active/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_all_inactive_customer(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadResponse>(
            `${environment.ApiUrl}/lead/customer/inactive/${db_access}/${business_owner}/${business_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async get_Lead(lead_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<LeadResponse>(
            `${environment.ApiUrl}/lead/one/${db_access}/${business_owner}/${business_uid}/${lead_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }

  async delete_lead(lead_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.delete<LeadResponse>(
            `${environment.ApiUrl}/lead/one/${db_access}/${business_owner}/${business_uid}/${lead_uid}`
          )
        );
        return data.response;
      } catch (e: any) {
        this.notificationsService.ErrorNotification(
          e?.error?.leadCode ? e?.error?.leadCode : 500,
          e?.error?.message ? e?.error?.message : 'Error connect to server'
        );
      }
    }
  }
}
