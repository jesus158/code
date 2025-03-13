import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { PermissionsModule } from 'src/modules/main_modules/permissions/permissions.module';

@Module({
  imports: [ConnectionModule, PermissionsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
