import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { ConnectionModule } from '../connection/connection.module';

@Module({
  imports: [ConnectionModule],
  providers: [NotificationsGateway, NotificationsService],
})
export class NotificationsModule {}
