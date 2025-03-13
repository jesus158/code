import { Module } from '@nestjs/common';
import { BusinessOwnerService } from './business_owner.service';
import { BusinessOwnerController } from './business_owner.controller';
import { ConnectionModule } from '../connection/connection.module';
import { UserModule } from '../configuration/user/user.module';
import { SidebarModule } from '../configuration/preferences/sidebar/sidebar.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PermissionsModule } from '../main_modules/permissions/permissions.module';

@Module({
  imports: [
    ConnectionModule,
    UserModule,
    PermissionsModule,
    SidebarModule,
    SubscriptionModule,
  ],
  controllers: [BusinessOwnerController],
  providers: [BusinessOwnerService],
  exports: [BusinessOwnerService],
})
export class BusinessOwnerModule {}
