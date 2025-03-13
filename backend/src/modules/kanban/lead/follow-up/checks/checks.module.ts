import { Module } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { ChecksController } from './checks.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [ChecksController],
  providers: [ChecksService],
})
export class ChecksModule {}
