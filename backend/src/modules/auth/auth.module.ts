import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { EmailModule } from '../email/email.module';
import { ConnectionModule } from '../connection/connection.module';
import { BusinessOwnerModule } from '../business_owner/business_owner.module';
import { UserModule } from '../configuration/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7 days' },
    }),
    EmailModule,
    ConnectionModule,
    BusinessOwnerModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
