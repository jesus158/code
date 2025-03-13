import { Module } from '@nestjs/common';
import { FacebookApiModule } from './facebook_api/facebook_api.module';
import { InstagramApiModule } from './instagram_api/instagram_api.module';
import { WhatsappApiModule } from './whatsapp_api/whatsapp_api.module';

@Module({
  imports: [FacebookApiModule, InstagramApiModule, WhatsappApiModule],
})
export class ApisModule {}
