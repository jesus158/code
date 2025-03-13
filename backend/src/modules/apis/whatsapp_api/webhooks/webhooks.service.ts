import { HttpStatus, Injectable } from '@nestjs/common';
import { ReceiveMessage } from './entities/whatsapp_receive_message.entity';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { WhatsAppInfo } from '../entities/whatsapp_info.entity';
import { Lead } from 'src/modules/kanban/lead/entities/lead.entity';
import { LeadChat } from 'src/modules/kanban/lead/lead-chat/entities/lead-chat.entity';
import { LeadService } from 'src/modules/kanban/lead/lead.service';

@Injectable()
export class WebhooksService {
  lead__: Lead;
  constructor(
    private connection: ConnectionService,
    private leadService: LeadService,
  ) {}
  async verify_token(query) {
    const verify_token = 'prueba2023';

    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    if (!mode || !token) {
      throw new Error('Missing mode or token');
    }

    if (mode !== 'subscribe' || token !== verify_token) {
      throw new Error('Invalid mode or token');
    }

    return challenge;
  }

  async processWebhook(request: ReceiveMessage): Promise<number> {
    // Establish a connection to the database
    const connection_ = await this.connection.Connection();
    const entries = request.entry;
    // Iterate over each entry
    for (const entry of entries) {
      // Iterate over each change in the entry
      for (const change of entry.changes) {
        const value = change.value;

        // Process the value and metadata
        const messagingProduct = value.messaging_product;
        const metadata = value.metadata;
        const displayPhoneNumber = metadata.display_phone_number;
        const phoneNumberId = metadata.phone_number_id;

        // Look for an existing access number in the database
        const find_access_number = await connection_.manager.findOne(
          WhatsAppInfo,
          {
            relations: {
              access: true,
            },
            where: {
              phone_number: displayPhoneNumber,
              phone_number_uid: phoneNumberId,
            },
          },
        );

        // If an access number is found, connect to the tenant access
        if (!find_access_number) {
          // If no access number is found, create a new WhatsAppInfo
          /*  const whatsapp_info = new WhatsAppInfo();
          whatsapp_info.phone_number = displayPhoneNumber;
          whatsapp_info.phone_number_uid = phoneNumberId;
          await connection_.manager.save(WhatsAppInfo, whatsapp_info); */
        } else {
          // Process contacts
          if (value.contacts) {
            for (const contact of value.contacts) {
              const contactName = contact.profile.name;
              const contactWaId = contact.wa_id;
              const lead_ = new Lead();
              lead_.lead_name = contactName;
              lead_.lead_wa_id = String(contactWaId);
              lead_.is_leads = true;
              this.lead__ = lead_;
            }
          }
          // Process messages
          if (
            value.messages &&
            find_access_number &&
            find_access_number.access &&
            find_access_number.access.db_access
          ) {
            const connection__ = await this.connection.ConnectionTenantAccess(
              find_access_number.access.db_access,
            );
            for (const message of value.messages) {
              const from = message.from;
              const messageId = message.id;
              const timestamp = message.timestamp;
              const type = message.type;
              const body = message.text?.body;

              const lead_ = new Lead();
              lead_.lead_name = this.lead__.lead_name;
              lead_.lead_phone = from;
              lead_.is_leads = this.lead__.is_leads;
              lead_.lead_wa_id = this.lead__.lead_wa_id;
              lead_.lead_messaging_product = messagingProduct;
              lead_.is_chat_active = true;
              const find_lead_ = await connection__.manager.findOne(Lead, {
                where: {
                  lead_wa_id: lead_.lead_wa_id,
                },
              });
              if (!find_lead_) {
                const save_lead = await this.leadService.create(
                  find_access_number.access.db_access,
                  lead_,
                );

                const lead_chat_ = new LeadChat();
                lead_chat_.lead_chat_from = from;
                lead_chat_.lead_chat_message_id = messageId;
                lead_chat_.lead_chat_timestamp = timestamp;
                lead_chat_.lead_chat_type = type;
                lead_chat_.lead_chat_body = body;
                const lead_chat__ = await connection__.manager.create(
                  LeadChat,
                  lead_chat_,
                );
                lead_chat__.lead = save_lead.response;
                await connection__.manager.save(LeadChat, lead_chat__);
              } else {
                if (find_lead_.is_chat_active === false) {
                  const lead_update_ = new Lead();
                  lead_update_.is_chat_active = true;
                  await connection__.manager.update(
                    Lead,
                    find_lead_.lead_uid,
                    lead_update_,
                  );
                }
                const lead_chat_ = new LeadChat();
                lead_chat_.lead_chat_from = from;
                lead_chat_.lead_chat_message_id = messageId;
                lead_chat_.lead_chat_timestamp = timestamp;
                lead_chat_.lead_chat_type = type;
                lead_chat_.lead_chat_body = body;
                const lead_chat__ = await connection__.manager.create(
                  LeadChat,
                  lead_chat_,
                );
                lead_chat__.lead = find_lead_;
                await connection__.manager.save(LeadChat, lead_chat__);
              }

              // Do something with the message data
            }
            connection__.destroy();
          }
        }
      }
    }

    // Close the connection
    connection_.destroy();

    // Return a success status
    return HttpStatus.OK;
  }
}
