import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Access } from './entities/access.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async auth(@Body() access: Access) {
    return await this.authService.auth(access);
  }

  /*  @UseGuards(AuthGuard)
  @Get('access/:db_access')
  async getAll(@Param('db_access') db_access): Promise<any> {
    const result = await this.authService.find(db_access);
    return result;
  }

  @Get('recovery_code/:db_access/:access_recovery')
  async getRecoveryCode(
    @Param('db_access') db_access,
    @Param('access_recovery') access_recovery,
  ): Promise<any> {
    const result = await this.authService.get_recovery_code(
      db_access,
      access_recovery,
    );
    return result;
  }

  @Put('generate_recovery_code')
  async generate_recovery_code(@Body() access: Access): Promise<any> {
    const result = await this.authService.generate_recovery_code(access);
    return result;
  }

  @Put('update_password')
  async Update(@Body() access: Access): Promise<any> {
    const result = await this.authService.update_password(access);
    return result;
  }

  @Put(':db_access/update_password_dash')
  async Update_password_dash(
    @Param('db_access') db_access,
    @Body() access: Access,
  ): Promise<any> {
    const result = await this.authService.update_password_dash(access);
    return result;
  } */
}
