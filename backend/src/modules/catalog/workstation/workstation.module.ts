import { Module } from '@nestjs/common';
import { WorkstationService } from './workstation.service';
import { WorkstationController } from './workstation.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [WorkstationController],
  providers: [WorkstationService],
})
export class WorkstationModule {}
