import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesbotDto } from './create-salesbot.dto';

export class UpdateSalesbotDto extends PartialType(CreateSalesbotDto) {}
