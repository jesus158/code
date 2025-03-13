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
import { WorkstationService } from './workstation.service';
import { Workstation } from './entities/workstation.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('workstation')
export class WorkstationController {
  constructor(private readonly workstationService: WorkstationService) {}

  @Post(':db_access/:business_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() workstation: Workstation,
  ) {
    return this.workstationService.create(db_access, business_uid, workstation);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:workstation_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('workstation_uid') workstation_uid,
    @Body() workstation: Workstation,
  ) {
    return this.workstationService.update(
      db_access,
      business_owner_uid,
      business_uid,
      workstation_uid,
      workstation,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.workstationService.Find(
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
    const result = await this.workstationService.FindActive(
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
    const result = await this.workstationService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:workstation_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('workstation_uid') workstation_uid,
  ): Promise<any> {
    const result = await this.workstationService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      workstation_uid,
    );
    return result;
  }
}
