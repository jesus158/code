import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterNumberDto } from './create-register_number.dto';

export class UpdateRegisterNumberDto extends PartialType(
  CreateRegisterNumberDto,
) {}
