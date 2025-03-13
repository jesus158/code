import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BusinessOwnerService } from './business_owner.service';
import { BusinessOwner } from './entities/business_owner.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('business-owner')
export class BusinessOwnerController {
  constructor(private readonly businessOwnerService: BusinessOwnerService) {}

  @Post()
  create(@Body() business_owner: BusinessOwner): Promise<any> {
    return this.businessOwnerService.create(business_owner);
  }

  @UseGuards(AuthGuard)
  @Put()
  Update(@Body() business_owner: BusinessOwner) {
    return this.businessOwnerService.create(business_owner);
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid')
  getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
  ): Promise<any> {
    return this.businessOwnerService.FindOne(db_access, business_owner_uid);
  }
}
