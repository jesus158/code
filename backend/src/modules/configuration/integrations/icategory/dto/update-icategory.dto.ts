import { PartialType } from '@nestjs/mapped-types';
import { CreateIcategoryDto } from './create-icategory.dto';

export class UpdateIcategoryDto extends PartialType(CreateIcategoryDto) {}
