import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post(':db_access/:business_uid/:main_module_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Param('main_module_uid') main_module_uid,
    @Body() permission: Permission,
  ) {
    return this.permissionsService.create(
      db_access,
      business_uid,
      main_module_uid,
      permission,
    );
  }

  @Put(':db_access/:permission_uid')
  Update(
    @Param('db_access') db_access,
    @Param('permission_uid') permission_uid,
    @Body() permission: Permission,
  ) {
    return this.permissionsService.update(
      db_access,
      permission_uid,
      permission,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access')
  async getAll(@Param('db_access') db_access): Promise<any> {
    const result = await this.permissionsService.Find(db_access);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('active/:db_access')
  async getActive(@Param('db_access') db_access): Promise<any> {
    const result = await this.permissionsService.FindActive(db_access);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('inactive/:db_access')
  async getInactive(@Param('db_access') db_access): Promise<any> {
    const result = await this.permissionsService.FindInactive(db_access);
    return result;
  }

  @Get('one/:db_access/:permission_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('permission_uid') permission_uid,
  ): Promise<any> {
    const result = await this.permissionsService.FindOne(
      db_access,
      permission_uid,
    );
    return result;
  }
}
