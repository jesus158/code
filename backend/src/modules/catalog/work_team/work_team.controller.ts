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
import { WorkTeamService } from './work_team.service';
import { WorkTeam } from './entities/work_team.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('work-team')
export class WorkTeamController {
  constructor(private readonly workTeamService: WorkTeamService) {}

  @Post(':db_access/:business_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() work_team: WorkTeam,
  ) {
    return this.workTeamService.create(db_access, business_uid, work_team);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:work_team_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('work_team_uid') work_team_uid,
    @Body() work_team: WorkTeam,
  ) {
    return this.workTeamService.update(
      db_access,
      business_owner_uid,
      business_uid,
      work_team_uid,
      work_team,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.workTeamService.Find(
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
    const result = await this.workTeamService.FindActive(
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
    const result = await this.workTeamService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:work_team_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('work_team_uid') work_team_uid,
  ): Promise<any> {
    const result = await this.workTeamService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      work_team_uid,
    );
    return result;
  }
}
