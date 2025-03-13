import { PartialType } from '@nestjs/mapped-types';
import { CreateResponseTemplateDto } from './create-response_template.dto';

export class UpdateResponseTemplateDto extends PartialType(
  CreateResponseTemplateDto,
) {}
