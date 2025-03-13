import { Module } from '@nestjs/common';
import { InstagramApiService } from './instagram_api.service';
import { InstagramApiController } from './instagram_api.controller';

@Module({
  controllers: [InstagramApiController],
  providers: [InstagramApiService],
})
export class InstagramApiModule {}
