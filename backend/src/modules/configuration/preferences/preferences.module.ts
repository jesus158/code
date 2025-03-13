import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { SidebarModule } from './sidebar/sidebar.module';

@Module({
  imports: [ConnectionModule, SidebarModule],
  controllers: [PreferencesController],
  providers: [PreferencesService],
})
export class PreferencesModule {}
