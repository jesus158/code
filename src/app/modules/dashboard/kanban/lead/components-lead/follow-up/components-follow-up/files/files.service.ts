import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/modules/dashboard/components-dashboard/shared/notitications/notifications.service';
import { environment } from 'src/environments/environment.development';
import { Files, FilesResponse } from './interfaces/files';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_files(follow_up_uid: string, files: Files): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    if (db_access) {
      try {
        const result = await firstValueFrom(
          this.http.post<Files>(
            `${environment.ApiUrl}/files/${db_access}/${follow_up_uid}`,
            files
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

  async update_files(
    files_uid: string | null | undefined,
    files: Files
  ): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const result = await firstValueFrom(
          this.http.put<Files>(
            `${environment.ApiUrl}/files/${db_access}/${business_owner}/${business_uid}/${files_uid}`,
            files
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

  async get_all_files(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FilesResponse>(
            `${environment.ApiUrl}/files/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_inactive_files(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FilesResponse>(
            `${environment.ApiUrl}/files/inactive/${db_access}/${business_owner}/${business_uid}`
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

  async get_all_active_files(): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FilesResponse>(
            `${environment.ApiUrl}/files/active/${db_access}/${business_owner}/${business_uid}`
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

  async get_Files(files_uid: string | null | undefined): Promise<any> {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('u_o');
    const business_uid = this.cookieService.get('b_a');
    if (db_access && business_uid) {
      try {
        const data = await firstValueFrom(
          this.http.get<FilesResponse>(
            `${environment.ApiUrl}/files/one/${db_access}/${business_owner}/${business_uid}/${files_uid}`
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
