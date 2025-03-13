import { Injectable } from '@angular/core';
import { NotificationsService } from '../../dashboard/components-dashboard/shared/notitications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Roles } from './interfaces/roles';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async post_roles(roles: Roles): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.http.post<Roles>(`${environment.ApiUrl}/roles`, roles)
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

  async update_roles(roles_uid: string, roles: Roles): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.http.put<Roles>(`${environment.ApiUrl}/roles/${roles_uid}`, roles)
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

  async get_all_roles(): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<Roles>(`${environment.ApiUrl}/roles`)
      );
      return data.response;
    } catch (e: any) {
      this.notificationsService.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }

  async get_Roles(roles_uid: string | null | undefined): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<Roles>(`${environment.ApiUrl}/roles/one/${roles_uid}`)
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
