import { Module } from '@nestjs/common';
import { FacebookApiService } from './facebook_api.service';
import { FacebookApiController } from './facebook_api.controller';

@Module({
  controllers: [FacebookApiController],
  providers: [FacebookApiService],
})
export class FacebookApiModule {}
