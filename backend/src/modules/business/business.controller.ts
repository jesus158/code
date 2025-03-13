import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from './entities/business.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post(':db_access/:business_owner_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Body() business: Business,
  ) {
    return this.businessService.create(db_access, business_owner_uid, business);
  }

  @Put(':db_access/:business_owner_uid/:business_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Body() business: Business,
  ) {
    return this.businessService.update(
      db_access,
      business_owner_uid,
      business_uid,
      business,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid')
  async get(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
  ): Promise<any> {
    const result = await this.businessService.Find(
      db_access,
      business_owner_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('five/:db_access/:business_owner_uid')
  async FindLastFive(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
  ): Promise<any> {
    const result = await this.businessService.FindLastFive(
      db_access,
      business_owner_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('active/:db_access/:business_owner_uid')
  async getActive(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
  ): Promise<any> {
    const result = await this.businessService.FindActive(
      db_access,
      business_owner_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('inactive/:db_access/:business_owner_uid')
  async getInactive(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
  ): Promise<any> {
    const result = await this.businessService.FindInactive(
      db_access,
      business_owner_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.businessService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/comm_tools/:db_access/:business_owner_uid/:business_uid')
  async getOneCommTools(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.businessService.FindOneForCommunicationsTools(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }
}
