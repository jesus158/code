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
import { ChecksService } from './checks.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Checks } from './entities/check.entity';

@Controller('checks')
export class ChecksController {
  constructor(private readonly checksService: ChecksService) {}

  @Post(':db_access/:follow_up_uid')
  create(
    @Param('db_access') db_access,
    @Param('follow_up_uid') follow_up_uid,
    @Body() checks: Checks,
  ) {
    return this.checksService.create(db_access, follow_up_uid, checks);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:checks_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('checks_uid') checks_uid,
    @Body() checks: Checks,
  ) {
    return this.checksService.update(
      db_access,
      business_owner_uid,
      business_uid,
      checks_uid,
      checks,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.checksService.Find(
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
    const result = await this.checksService.FindActive(
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
    const result = await this.checksService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:checks_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('checks_uid') checks_uid,
  ): Promise<any> {
    const result = await this.checksService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      checks_uid,
    );
    return result;
  }
}
