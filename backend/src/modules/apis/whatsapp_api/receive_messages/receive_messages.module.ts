import { Module } from '@nestjs/common';
import { ReceiveMessagesService } from './receive_messages.service';
import { ReceiveMessagesController } from './receive_messages.controller';
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
  controllers: [ReceiveMessagesController],
  providers: [ReceiveMessagesService],
})
export class ReceiveMessagesModule {}
