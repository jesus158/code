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
import { SalesbotService } from './salesbot.service';
import { Salesbot } from './entities/salesbot.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('salesbot')
export class SalesbotController {
  constructor(private readonly salesbotService: SalesbotService) {}

  @Post(':db_access/:business_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() salesbot: Salesbot,
  ) {
    return this.salesbotService.create(db_access, business_uid, salesbot);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:salesbot_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('salesbot_uid') salesbot_uid,
    @Body() salesbot: Salesbot,
  ) {
    return this.salesbotService.update(
      db_access,
      business_owner_uid,
      business_uid,
      salesbot_uid,
      salesbot,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.salesbotService.Find(
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
    const result = await this.salesbotService.FindInactive(
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
    const result = await this.salesbotService.FindActive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:salesbot_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('salesbot_uid') salesbot_uid,
  ): Promise<any> {
    const result = await this.salesbotService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      salesbot_uid,
    );
    return result;
  }
}
