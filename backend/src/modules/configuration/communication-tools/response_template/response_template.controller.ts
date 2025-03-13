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
import { ResponseTemplateService } from './response_template.service';
import { ResponseTemplate } from './entities/response_template.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('response-template')
export class ResponseTemplateController {
  constructor(
    private readonly responseTemplateService: ResponseTemplateService,
  ) {}

  @Post(':db_access/:business_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() response_template: ResponseTemplate,
  ) {
    return this.responseTemplateService.create(
      db_access,
      business_uid,
      response_template,
    );
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:response_template_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('response_template_uid') response_template_uid,
    @Body() response_template: ResponseTemplate,
  ) {
    return this.responseTemplateService.update(
      db_access,
      business_owner_uid,
      business_uid,
      response_template_uid,
      response_template,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.responseTemplateService.Find(
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
    const result = await this.responseTemplateService.FindActive(
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
    const result = await this.responseTemplateService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get(
    'one/:db_access/:business_owner_uid/:business_uid/:response_template_uid',
  )
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('response_template_uid') response_template_uid,
  ): Promise<any> {
    const result = await this.responseTemplateService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      response_template_uid,
    );
    return result;
  }
}
