import { Module } from '@nestjs/common';
import { ReturnResponsesService } from './return_responses/return_responses.service';

@Module({
  providers: [ReturnResponsesService],
  exports: [ReturnResponsesService],
})
export class UtilsModule {}
