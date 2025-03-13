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
import { LeadService } from './lead.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Lead } from './entities/lead.entity';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post(':db_access')
  create(@Param('db_access') db_access, @Body() lead: Lead) {
    return this.leadService.create(db_access, lead);
  }

  @Post('customer/:db_access')
  createCustomer(@Param('db_access') db_access, @Body() lead: Lead) {
    return this.leadService.createCustomer(db_access, lead);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:lead_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('lead_uid') lead_uid,
    @Body() lead: Lead,
  ) {
    return this.leadService.update(
      db_access,
      business_owner_uid,
      business_uid,
      lead_uid,
      lead,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getLeads(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.leadService.FindLeads(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('customer/:db_access/:business_owner_uid/:business_uid')
  async getCustomer(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.leadService.FindCustomer(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('active/:db_access/:business_owner_uid/:business_uid')
  async getActiveLeads(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.leadService.FindActiveLeads(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('inactive/:db_access/:business_owner_uid/:business_uid')
  async getInactiveLeads(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.leadService.FindInactiveLeads(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('customer/active/:db_access/:business_owner_uid/:business_uid')
  async getActiveCustomer(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.leadService.FindActiveCustomer(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('customer/inactive/:db_access/:business_owner_uid/:business_uid')
  async getInactiveCustomer(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.leadService.FindInactiveCustomer(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:lead_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('lead_uid') lead_uid,
  ): Promise<any> {
    const result = await this.leadService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      lead_uid,
    );
    return result;
  }
}
