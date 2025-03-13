import { Module } from '@nestjs/common';
import { LeadModule } from './lead/lead.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [LeadModule, StatusModule],
  exports: [StatusModule, LeadModule],
})
export class KanbanModule {}
