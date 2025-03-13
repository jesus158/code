import { PartialType } from '@nestjs/mapped-types';
import { CreateMainModuleDto } from './create-main_module.dto';

export class UpdateMainModuleDto extends PartialType(CreateMainModuleDto) {}
