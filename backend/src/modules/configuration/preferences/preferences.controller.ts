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
import { PreferencesService } from './preferences.service';
import { Preference } from './entities/preference.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post(':db_access/:business_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() preferences: Preference,
  ) {
    return this.preferencesService.create(db_access, business_uid, preferences);
  }

  @Put(':preferences_uid/:db_access/:business_uid')
  Update(
    @Param('preferences_uid') preferences_uid,
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
    @Body() preferences: Preference,
  ) {
    return this.preferencesService.update(
      preferences_uid,
      db_access,
      business_uid,
      preferences,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.preferencesService.Find(db_access, business_uid);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('active/:db_access/:business_uid')
  async getActive(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.preferencesService.FindActive(
      db_access,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('inactive/:db_access/:business_uid')
  async getInactive(
    @Param('db_access') db_access,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.preferencesService.FindInactive(
      db_access,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:preferences_uid/:business_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('preferences_uid') preferences_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.preferencesService.FindOne(
      db_access,
      preferences_uid,
      business_uid,
    );
    return result;
  }
}
