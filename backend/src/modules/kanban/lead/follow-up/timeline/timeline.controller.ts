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
import { TimelineService } from './timeline.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Timeline } from './entities/timeline.entity';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Post(':db_access/:follow_up_uid')
  create(
    @Param('db_access') db_access,
    @Param('follow_up_uid') follow_up_uid,
    @Body() timeline: Timeline,
  ) {
    return this.timelineService.create(db_access, follow_up_uid, timeline);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:timeline_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('timeline_uid') timeline_uid,
    @Body() timeline: Timeline,
  ) {
    return this.timelineService.update(
      db_access,
      business_owner_uid,
      business_uid,
      timeline_uid,
      timeline,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.timelineService.Find(
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
    const result = await this.timelineService.FindActive(
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
    const result = await this.timelineService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:timeline_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('timeline_uid') timeline_uid,
  ): Promise<any> {
    const result = await this.timelineService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      timeline_uid,
    );
    return result;
  }
}
