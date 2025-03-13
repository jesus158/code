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
import { FollowUpService } from './follow-up.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { FollowUp } from './entities/follow-up.entity';

@Controller('follow-up')
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @Post(':db_access/:lead_uid')
  create(
    @Param('db_access') db_access,
    @Param('lead_uid') lead_uid,
    @Body() follow_up: FollowUp,
  ) {
    return this.followUpService.create(db_access, lead_uid, follow_up);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:follow_up_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('follow_up_uid') follow_up_uid,
    @Body() follow_up: FollowUp,
  ) {
    return this.followUpService.update(
      db_access,
      business_owner_uid,
      business_uid,
      follow_up_uid,
      follow_up,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.followUpService.Find(
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
    const result = await this.followUpService.FindActive(
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
    const result = await this.followUpService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:follow_up_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('follow_up_uid') follow_up_uid,
  ): Promise<any> {
    const result = await this.followUpService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      follow_up_uid,
    );
    return result;
  }
}
