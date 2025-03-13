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
import { IntegrationService } from './integration.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Integration } from './entities/integration.entity';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post(':db_access/:category_uid')
  create(
    @Param('db_access') db_access,
    @Param('category_uid') category_uid,
    @Body() integrations: Integration,
  ) {
    return this.integrationService.create(
      db_access,
      category_uid,
      integrations,
    );
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:integrations_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('integrations_uid') integrations_uid,
    @Body() integrations: Integration,
  ) {
    return this.integrationService.update(
      db_access,
      business_owner_uid,
      business_uid,
      integrations_uid,
      integrations,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.integrationService.Find(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('active/:db_access/:business_owner_uid/:business_uid')
  async getActive(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.integrationService.FindActive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('inactive/:db_access/:business_owner_uid/:business_uid')
  async getInactive(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.integrationService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:integrations_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('integrations_uid') integrations_uid,
  ): Promise<any> {
    const result = await this.integrationService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      integrations_uid,
    );
    return result;
  }
}
