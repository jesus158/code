import {
  Controller,
  Body,
  HttpStatus,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { SendMessagesService } from './send_messages.service';
import { WhatsappApiRequest } from './entities/whatsapp_api_request.entity';
import { AxiosResponse } from 'axios';
import { WhatsappApiResponse } from './entities/whatsapp_api_response.entity';

@Controller('send-messages')
export class SendMessagesController {
  constructor(private readonly sendMessagesService: SendMessagesService) {}

  @Post(':db_access/:lead_uid')
  async create(
    @Param('db_access') db_access,
    @Param('lead_uid') lead_uid,
    @Body() request: WhatsappApiRequest,
  ): Promise<AxiosResponse<WhatsappApiResponse>> {
    try {
      if (
        !request ||
        !request.messaging_product ||
        !request.to ||
        !request.type ||
        !request.template
      ) {
        throw new Error('Invalid request');
      }

      const res = await this.sendMessagesService.send_message(
        db_access,
        lead_uid,
        request,
      );
      return res; // Devuelve la respuesta
    } catch (err) {
      console.log(err.response?.data?.error);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
