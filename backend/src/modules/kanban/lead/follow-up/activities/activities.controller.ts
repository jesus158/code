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
import { ActivitiesService } from './activities.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Activity } from './entities/activity.entity';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post(':db_access/:follow_up_uid')
  create(
    @Param('db_access') db_access,
    @Param('follow_up_uid') follow_up_uid,
    @Body() activities: Activity,
  ) {
    return this.activitiesService.create(db_access, follow_up_uid, activities);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:activities_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('activities_uid') activities_uid,
    @Body() activities: Activity,
  ) {
    return this.activitiesService.update(
      db_access,
      business_owner_uid,
      business_uid,
      activities_uid,
      activities,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.activitiesService.Find(
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
    const result = await this.activitiesService.FindActive(
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
    const result = await this.activitiesService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:activities_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('activities_uid') activities_uid,
  ): Promise<any> {
    const result = await this.activitiesService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      activities_uid,
    );
    return result;
  }
}
