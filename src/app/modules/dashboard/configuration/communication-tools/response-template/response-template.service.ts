import { Injectable } from '@angular/core';
import { NotificationsService } from '../../../components-dashboard/shared/notitications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  ResponseTemplate,
  TemplateResponse,
} from './interfaces/response-template';

@Injectable({
  providedIn: 'root',
})
export class ResponseTemplateService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_response_template(
    response_template: ResponseTemplate
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.post<ResponseTemplate>(
            `${environment.ApiUrl}/response-template/${db_access}/${business_uid}`,
            response_template
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

  async update_response_template(
    response_template_uid: string,
    response_template: ResponseTemplate
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<ResponseTemplate>(
            `${environment.ApiUrl}/response-template/${db_access}/${business_owner}/${business_uid}/${response_template_uid}`,
            response_template
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

  async get_all_response_template(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/response-template/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_response_template(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/response-template/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_response_template(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/response-template/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_ResponseTemplate(
    response_template_uid: string | null | undefined
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const business_owner = this.cookieService.get('u_o');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<TemplateResponse>(
            `${environment.ApiUrl}/response-template/one/${db_access}/${business_owner}/${business_uid}/${response_template_uid}`
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
