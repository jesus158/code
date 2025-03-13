import { NgModule } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  exports: [
    NzMenuModule,
    NzFormModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzPageHeaderModule,
    NzTableModule,
    NzAvatarModule,
    NzLayoutModule,
    NzMessageModule,
    NzNotificationModule,
    NzToolTipModule,
    NzButtonModule,
    NzQRCodeModule,
    NzSwitchModule,
    NzBadgeModule,
    NzTagModule,
    NzProgressModule,
    NzCalendarModule,
    NzAlertModule,
    NzPopconfirmModule
  ],
})
export class NgZorroModule {}
