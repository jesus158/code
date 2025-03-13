import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { LeadChatModule } from './lead-chat/lead-chat.module';

@Module({
  imports: [ConnectionModule, FollowUpModule, LeadChatModule],
  controllers: [LeadController],
  providers: [LeadService],
  exports: [LeadService],
})
export class LeadModule {}
