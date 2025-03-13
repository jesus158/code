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
import { TrackClicksService } from './track_clicks.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { TrackClick } from './entities/track_click.entity';

@Controller('track-clicks')
export class TrackClicksController {
  constructor(private readonly trackClicksService: TrackClicksService) {}

  @Post(':db_access/:business_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() track_clicks: TrackClick,
  ) {
    return this.trackClicksService.create(
      db_access,
      business_uid,
      track_clicks,
    );
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:track_clicks_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('track_clicks_uid') track_clicks_uid,
    @Body() track_clicks: TrackClick,
  ) {
    return this.trackClicksService.update(
      db_access,
      business_owner_uid,
      business_uid,
      track_clicks_uid,
      track_clicks,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.trackClicksService.Find(
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
    const result = await this.trackClicksService.FindInactive(
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
    const result = await this.trackClicksService.FindActive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:track_clicks_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('track_clicks_uid') track_clicks_uid,
  ): Promise<any> {
    const result = await this.trackClicksService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      track_clicks_uid,
    );
    return result;
  }
}
