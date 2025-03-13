import { Module } from '@nestjs/common';
import { OfficeModule } from './office/office.module';
import { StaffModule } from './staff/staff.module';
import { WorkTeamModule } from './work_team/work_team.module';
import { WorkstationModule } from './workstation/workstation.module';
import { ConnectionModule } from '../connection/connection.module';

@Module({
  imports: [StaffModule, WorkTeamModule, OfficeModule, WorkstationModule],
})
export class CatalogModule {}
