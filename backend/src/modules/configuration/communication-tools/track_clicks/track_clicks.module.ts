import { Module } from '@nestjs/common';
import { TrackClicksService } from './track_clicks.service';
import { TrackClicksController } from './track_clicks.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [TrackClicksController],
  providers: [TrackClicksService],
})
export class TrackClicksModule {}
