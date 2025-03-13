import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/httpService.config';
import { WhatsappApiService } from './whatsapp_api.service';
import { WhatsappApiController } from './whatsapp_api.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { SendMessagesModule } from './send_messages/send_messages.module';
import { ReceiveMessagesModule } from './receive_messages/receive_messages.module';
import { RegisterNumbersModule } from './register_numbers/register_numbers.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConnectionModule,
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    SendMessagesModule,
    ReceiveMessagesModule,
    RegisterNumbersModule,
    WebhooksModule,
  ],
  controllers: [WhatsappApiController],
  providers: [WhatsappApiService],
})
export class WhatsappApiModule {}
