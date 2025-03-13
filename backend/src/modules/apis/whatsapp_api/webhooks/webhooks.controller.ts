import { Controller, Get, Post, Body, Logger, Query } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get()
  verify_token(@Query() query) {
    return this.webhooksService.verify_token(query);
  }

  @Post()
  process_webhook(@Body() request: any) {
    const logger = new Logger();
    logger.log(request);
    return this.webhooksService.processWebhook(request);
  }
}
