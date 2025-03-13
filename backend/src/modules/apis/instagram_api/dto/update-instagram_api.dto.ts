import { PartialType } from '@nestjs/mapped-types';
import { CreateInstagramApiDto } from './create-instagram_api.dto';

export class UpdateInstagramApiDto extends PartialType(CreateInstagramApiDto) {}
