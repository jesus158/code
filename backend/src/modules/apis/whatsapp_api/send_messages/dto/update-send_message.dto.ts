import { PartialType } from '@nestjs/mapped-types';
import { CreateSendMessageDto } from './create-send_message.dto';

export class UpdateSendMessageDto extends PartialType(CreateSendMessageDto) {}
