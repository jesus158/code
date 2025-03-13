import { Module } from '@nestjs/common';
import { MainModulesService } from './main_modules.service';
import { MainModulesController } from './main_modules.controller';
import { ConnectionModule } from '../connection/connection.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PermissionsModulesModule } from './permissions_modules/permissions_modules.module';

@Module({
  imports: [ConnectionModule, PermissionsModule, PermissionsModulesModule],
  controllers: [MainModulesController],
  providers: [MainModulesService],
})
export class MainModulesModule {}
