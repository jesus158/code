import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/httpService.config';
import { KanbanModule } from 'src/modules/kanban/kanban.module';

@Module({
  imports: [
    ConnectionModule,
    KanbanModule,
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
