import { Module } from '@nestjs/common';
import { WorkTeamService } from './work_team.service';
import { WorkTeamController } from './work_team.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [WorkTeamController],
  providers: [WorkTeamService],
})
export class WorkTeamModule {}
