import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  NzNotificationService,
  NzNotificationPlacement,
} from 'ng-zorro-antd/notification';
import { Access, AccessResponse } from './access/interfaces/access';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ipAddress: string | undefined;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private notification: NzNotificationService,
    private jwtHelper: JwtHelperService
  ) {}

  /*  async getIPAddress() {
    const response = await firstValueFrom(
      this.http.get<any>(`http://api.ipify.org/?format=json`)
    );
    return response;
  } */

  async auth(access: Access): Promise<any> {
    try {
      const access_response = await firstValueFrom(this.http.post<AccessResponse>(`${environment.ApiUrl}/auth`, access));
      localStorage.setItem('session', 'true');
      /* additional meaning information: *jwt_access* = *j_a* */
      /* additional meaning information: *access_token* = *a_t* */
      /* additional meaning information: *uid access* = *u_a* */
      /* additional meaning information: *uid owner* = *u_o* */
      if (access_response.access?.owner) {
        this.cookieService.set('j_a', String(access_response.jwt_access));
        this.cookieService.set('u_o', String(access_response.access.owner.business_owner_uid));
        this.cookieService.set('a_t', String(access_response.access.db_access));
        this.WelcomeNotification();
        this.router.navigate(['stats']);
      } else if (access_response.access?.user) {
      }
      return access_response.access;
    } catch (err: any) {
      this.ErrorNotification( err.error?.statusCode ?? 500, err.error?.message ?? 'Error connect to server');
    }
  }

  /* Check if it is authenticated and return a boolean in true to confirm it */
  isAuthenticated(): boolean {
    const token = this.cookieService.get('j_a');
    return !this.jwtHelper.isTokenExpired(token);
  }

  async get_access(): Promise<AccessResponse> {
    try {
      const db_access = this.cookieService.get('a_t');
      const result = await firstValueFrom(
        this.http.get<AccessResponse>(`${environment.ApiUrl}/auth/access`)
      );
      return result;
    } catch (err: any) {
      return err;
    }
  }

  /* Message that shows to welcome the application. */
  WelcomeNotification(): void {
    let position: NzNotificationPlacement;
    position = 'top';
    this.notification.success(
      'Bienvenido a Prospecfy',
      'Se ha ingresado correctamente',
      { nzPlacement: position }
    );
  }

  UpdateNotification(): void {
    let position: NzNotificationPlacement;
    position = 'top';
    this.notification.success('', 'Datos actualizados correctamente', {
      nzPlacement: position,
    });
  }

  SendEmailNotification(): void {
    let position: NzNotificationPlacement;
    position = 'top';
    this.notification.success(
      'Codigo enviado exitosamente!',
      'Se ha enviado un codigo de recuperación a tu correo.',
      { nzPlacement: position }
    );
  }

  RecoveryCodeNotification(): void {
    let position: NzNotificationPlacement;
    position = 'top';
    this.notification.success(
      'Código de recuperación correcto!',
      'Ya puedes cambiar tu contraseña.',
      { nzPlacement: position }
    );
  }

  /* Message showing the errors. */
  ErrorNotification(statusCode: string, message: string): void {
    let position: NzNotificationPlacement;
    position = 'top';
    this.notification.error(statusCode, message, { nzPlacement: position, nzDuration: 2500 });
  }

  /* async get_access_recovery(access: Access): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<Access>(
          `${environment.ApiUrl}/auth/recovery_code/${access.access_recovery}`
        )
      );
      this.RecoveryCodeNotification();
      this.router.navigate([
        `set-password/${data.response_access.access_recovery}`,
      ]);
      return data.response_access;
    } catch (e: any) {
      this.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  } */

  async generate_recovery_code(access: Access): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.put<Access>(
          `${environment.ApiUrl}/auth/generate_recovery_code`,
          access
        )
      );

      this.SendEmailNotification();
      this.router.navigate(['recovery-code']);
      return data;
    } catch (e: any) {
      this.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }

  async update_password(access: Access): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.put<Access>(
          `${environment.ApiUrl}/auth/update_password`,
          access
        )
      );
      this.UpdateNotification();
      this.router.navigate(['auth']);
      return data;
    } catch (e: any) {
      this.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }

  async update_password_dash(access: Access): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.put<Access>(
          `${environment.ApiUrl}/auth/update_password_dash`,
          access
        )
      );
      this.UpdateNotification();
      this.router.navigate(['dashboard/configuration']);
      return data;
    } catch (e: any) {
      this.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }
}
