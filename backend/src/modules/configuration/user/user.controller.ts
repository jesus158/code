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
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':db_access/:business_owner_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Body() user: User,
  ) {
    return this.userService.create(db_access, business_owner_uid, user);
  }

  @Put(':user_uid/:db_access/:business_owner_uid')
  Update(
    @Param('user_uid') user_uid,
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Body() user: User,
  ) {
    return this.userService.update(
      user_uid,
      db_access,
      business_owner_uid,
      user,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid')
  async getAll(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
  ): Promise<any> {
    const result = await this.userService.Find(db_access, business_owner_uid);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:user_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('user_uid') user_uid,
  ): Promise<any> {
    const result = await this.userService.FindOne(
      db_access,
      business_owner_uid,
      user_uid,
    );
    return result;
  }
}
