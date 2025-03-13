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
import { PlansService } from './plans.service';
import { Plan } from './entities/plan.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() plans: Plan) {
    return this.plansService.create(plans);
  }

  @UseGuards(AuthGuard)
  @Put(':plans_uid')
  Update(@Param('plans_uid') plans_uid, @Body() plans: Plan) {
    return this.plansService.update(plans_uid, plans);
  }

  @UseGuards(AuthGuard)
  @Get()
  async get(): Promise<any> {
    const result = await this.plansService.Find();
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('active/:db_access')
  async getActive(@Param('db_access') db_access): Promise<any> {
    const result = await this.plansService.FindActive(db_access);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('inactive/:db_access')
  async getInactive(@Param('db_access') db_access): Promise<any> {
    const result = await this.plansService.FindInactive(db_access);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:plans_uid')
  async getOne(@Param('plans_uid') plans_uid): Promise<any> {
    const result = await this.plansService.FindOne(plans_uid);
    return result;
  }
}
