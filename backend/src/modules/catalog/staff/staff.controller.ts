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
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post(':db_access/:business_uid/:workstation_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Param('workstation_uid') workstation_uid,
    @Body() staff: Staff,
  ) {
    return this.staffService.create(
      db_access,
      business_uid,
      workstation_uid,
      staff,
    );
  }

  @Put(
    ':db_access/:business_owner_uid/:business_uid/:staff_uid/:workstation_uid',
  )
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('staff_uid') staff_uid,
    @Param('workstation_uid') workstation_uid,
    @Body() staff: Staff,
  ) {
    return this.staffService.update(
      db_access,
      business_owner_uid,
      business_uid,
      staff_uid,
      workstation_uid,
      staff,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.staffService.Find(
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
    const result = await this.staffService.FindInactive(
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
    const result = await this.staffService.FindActive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:staff_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('staff_uid') staff_uid,
  ): Promise<any> {
    const result = await this.staffService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      staff_uid,
    );
    return result;
  }
}
