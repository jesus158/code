import { Module } from '@nestjs/common';
import { SendMessagesService } from './send_messages.service';
import { SendMessagesController } from './send_messages.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/httpService.config';

@Module({
  imports: [
    ConnectionModule,
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [SendMessagesController],
  providers: [SendMessagesService],
})
export class SendMessagesModule {}
