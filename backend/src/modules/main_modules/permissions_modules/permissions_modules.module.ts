import { Module } from '@nestjs/common';
import { PermissionsModulesService } from './permissions_modules.service';
import { PermissionsModulesController } from './permissions_modules.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [PermissionsModulesController],
  providers: [PermissionsModulesService],
})
export class PermissionsModulesModule {}
