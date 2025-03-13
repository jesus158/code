import { Module } from '@nestjs/common';
import { LeadChatService } from './lead-chat.service';
import { LeadChatController } from './lead-chat.controller';

@Module({
  controllers: [LeadChatController],
  providers: [LeadChatService],
})
export class LeadChatModule {}
