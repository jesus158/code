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
import { SubscriptionService } from './subscription.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Subscription } from './entities/subscription.entity';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':db_access/:business_owner_uid/:business_uid/:plans_uid')
  create(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('plans_uid') plans_uid,
    @Body() subscriptions: Subscription,
  ) {
    return this.subscriptionService.create(
      db_access,
      business_owner_uid,
      business_uid,
      plans_uid,
      subscriptions,
    );
  }

  @Put(':db_access/:business_owner_uid/:business_uid/:subscriptions_uid')
  Update(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('subscriptions_uid') subscriptions_uid,
    @Body() subscriptions: Subscription,
  ) {
    return this.subscriptionService.update(
      db_access,
      business_owner_uid,
      business_uid,
      subscriptions_uid,
      subscriptions,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':db_access/:business_owner_uid/:business_uid')
  async get(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
  ): Promise<any> {
    const result = await this.subscriptionService.Find(
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
    const result = await this.subscriptionService.FindActive(
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
    const result = await this.subscriptionService.FindInactive(
      db_access,
      business_owner_uid,
      business_uid,
    );
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('one/:db_access/:business_owner_uid/:business_uid/:subscriptions_uid')
  async getOne(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Param('subscriptions_uid') subscriptions_uid,
  ): Promise<any> {
    const result = await this.subscriptionService.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      subscriptions_uid,
    );
    return result;
  }
}
