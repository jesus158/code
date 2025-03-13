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
import { PermissionsModulesService } from './permissions_modules.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Permissions_Module } from './entities/permissions_module.entity';

@Controller('permissions-modules')
export class PermissionsModulesController {
  constructor(
    private readonly permissionsModulesService: PermissionsModulesService,
  ) {}

  @Post(':db_access/:main_module_uid/:user_uid')
  create(
    @Param('db_access') db_access,
    @Param('main_module_uid') main_module_uid,
    @Param('user_uid') user_uid,
    @Body() permissions_module: Permissions_Module,
  ) {
    return this.permissionsModulesService.create(
      db_access,
      main_module_uid,
      user_uid,
      permissions_module,
    );
  }

  @Put(':db_access/:permission_uid')
  Update(
    @Param('db_access') db_access,
    @Param('permission_uid') permission_uid,
    @Body() permissions_module: Permissions_Module,
  ) {
    return this.permissionsModulesService.update(
      db_access,
      permission_uid,
      permissions_module,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:user_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('user_uid') user_uid,
  ): Promise<any> {
    const result = await this.permissionsModulesService.Find(
      db_access,
      business_owner_uid,
      user_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:permissions_module_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('permissions_module_uid') permissions_module_uid,
  ): Promise<any> {
    const result = await this.permissionsModulesService.FindOne(
      db_access,
      permissions_module_uid,
    );
    return result;
  }
}
