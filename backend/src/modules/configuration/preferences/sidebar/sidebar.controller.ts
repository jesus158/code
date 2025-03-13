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
import { SidebarService } from './sidebar.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Sidebar } from './entities/sidebar.entity';

@Controller('sidebar')
export class SidebarController {
  constructor(private readonly sidebarService: SidebarService) {}

  @Post(':db_access/:user_uid')
  create(
    @Param('db_access') db_access,
    @Param('user_uid') user_uid,
    @Body() sidebar: Sidebar,
  ) {
    return this.sidebarService.create(db_access, user_uid, sidebar);
  }

  @Put(':db_access/:business_owner_uid/:user_uid/:sidebar_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('user_uid') user_uid,
    @Param('sidebar_uid') sidebar_uid,
    @Body() sidebar: Sidebar,
  ) {
    return this.sidebarService.update(
      db_access,
      business_owner_uid,
      user_uid,
      sidebar_uid,
      sidebar,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access:/business_owner_uid/:user_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('user_uid') user_uid,
  ): Promise<any> {
    const result = await this.sidebarService.Find(
      db_access,
      business_owner_uid,
      user_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('active/:db_access/:business_owner_uid/:user_uid')
  async getActive(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('user_uid') user_uid,
  ): Promise<any> {
    const result = await this.sidebarService.FindActive(
      db_access,
      business_owner_uid,
      user_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('inactive/:db_access/:business_owner_uid/:user_uid')
  async getInactive(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('user_uid') user_uid,
  ): Promise<any> {
    const result = await this.sidebarService.FindInactive(
      db_access,
      business_owner_uid,
      user_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:sidebar_uid/:user_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('user_uid') user_uid,
    @Param('sidebar_uid') sidebar_uid,
  ): Promise<any> {
    const result = await this.sidebarService.FindOne(
      db_access,
      business_owner_uid,
      user_uid,
      sidebar_uid,
    );
    return result;
  }
}
