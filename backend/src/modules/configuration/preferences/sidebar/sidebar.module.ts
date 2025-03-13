import { Module } from '@nestjs/common';
import { SidebarService } from './sidebar.service';
import { SidebarController } from './sidebar.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [SidebarController],
  providers: [SidebarService],
  exports: [SidebarService],
})
export class SidebarModule {}
