import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private notification: NzNotificationService) {}

  /* Message that shows to welcome the application. */
  Success(): void {
    this.notification.success('Éxito', 'Creado con éxito', { nzPlacement: 'bottom' });
  }

  Update(): void {
    this.notification.success('Éxito', 'Actualizado con éxito!', { nzPlacement: 'bottom'});
  }

  /* Message showing the errors. */
  ErrorNotification(statusCode: string, message: string): void {
    this.notification.error(statusCode, message, { nzPlacement: 'top' });
  }
}
