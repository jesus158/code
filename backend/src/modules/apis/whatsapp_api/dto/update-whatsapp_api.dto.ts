import { PartialType } from '@nestjs/mapped-types';
import { CreateWhatsappApiDto } from './create-whatsapp_api.dto';

export class UpdateWhatsappApiDto extends PartialType(CreateWhatsappApiDto) {}
