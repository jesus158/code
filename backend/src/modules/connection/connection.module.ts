import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  controllers: [],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
