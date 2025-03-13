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
import { MainModulesService } from './main_modules.service';
import { AuthGuard } from '../auth/auth.guard';
import { MainModule } from './entities/main_module.entity';

@Controller('main-modules')
export class MainModulesController {
  constructor(private readonly mainModulesService: MainModulesService) {}

  @Post(':db_access')
  create(@Param('db_access') db_access, @Body() main_module: MainModule) {
    return this.mainModulesService.create(db_access, main_module);
  }

  @Put(':db_access/:main_modules_uid')
  Update(
    @Param('db_access') db_access,
    @Param('main_modules_uid') main_modules_uid,
    @Body() main_module: MainModule,
  ) {
    return this.mainModulesService.update(
      db_access,
      main_modules_uid,
      main_module,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:user_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('user_uid') user_uid,
  ): Promise<any> {
    const result = await this.mainModulesService.Find(db_access, user_uid);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:user_uid/:main_module_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('user_uid') user_uid,
    @Param('main_module_uid') main_module_uid,
  ): Promise<any> {
    const result = await this.mainModulesService.FindOne(
      db_access,
      user_uid,
      main_module_uid,
    );
    return result;
  }
}
