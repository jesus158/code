import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { WhatsappApiRequest } from './entities/whatsapp_api_request.entity';
import { WhatsappApiResponse } from './entities/whatsapp_api_response.entity';
import { HttpService } from '@nestjs/axios';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Lead } from 'src/modules/kanban/lead/entities/lead.entity';

@Injectable()
export class SendMessagesService {
  constructor(
    private httpService: HttpService,
    private connection: ConnectionService,
  ) {}

  async get_url(VERSION: string, PHONE_NUMBER_ID: number): Promise<string> {
    return `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`;
  }

  async send_message(
    db_access: string,
    lead_uid: string,
    request: WhatsappApiRequest,
  ): Promise<AxiosResponse<WhatsappApiResponse>> {
    const connection__ =
      await this.connection.ConnectionTenantAccess(db_access);
    const find_lead = await connection__.manager.findOne(Lead, {
      where: {
        lead_uid: lead_uid,
      },
    });
    if (find_lead) {
      try {
        const { data } = await firstValueFrom(
          this.httpService.post(
            await this.get_url('v17.0', 167712673094822),
            request,
          ),
        );
        return data;
      } catch (error) {
        console.error(
          'Error sending WhatsApp message: ',
          error?.response?.data?.error,
        );
        throw error?.response?.data?.error;
      }
    }
  }
}
