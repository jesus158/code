import { Module } from '@nestjs/common';
import { ResponseTemplateModule } from './response_template/response_template.module';
import { SalesbotModule } from './salesbot/salesbot.module';
import { TrackClicksModule } from './track_clicks/track_clicks.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ResponseTemplateModule, SalesbotModule, TrackClicksModule],
})
export class CommunicationToolsModule {}
