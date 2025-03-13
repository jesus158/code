import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadChatDto } from './create-lead-chat.dto';

export class UpdateLeadChatDto extends PartialType(CreateLeadChatDto) {}
