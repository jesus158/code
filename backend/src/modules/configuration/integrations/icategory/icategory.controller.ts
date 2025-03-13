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
import { IcategoryService } from './icategory.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Icategory } from './entities/icategory.entity';

@Controller('icategory')
export class IcategoryController {
  constructor(private readonly icategoryService: IcategoryService) {}

  @Post(':db_access/:business_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() category: Icategory,
  ) {
    return this.icategoryService.create(db_access, business_uid, category);
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:category_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('category_uid') category_uid,
    @Body() category: Icategory,
  ) {
    return this.icategoryService.update(
      db_access,
      business_owner_uid,
      business_uid,
      category_uid,
      category,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access:/business_owner_uid/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.icategoryService.Find(
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
    const result = await this.icategoryService.FindActive(
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
    const result = await this.icategoryService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:category_uid/:business_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('category_uid') category_uid,
  ): Promise<any> {
    const result = await this.icategoryService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      category_uid,
    );
    return result;
  }
}
