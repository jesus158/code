import { PartialType } from '@nestjs/mapped-types';
import { CreateSidebarDto } from './create-sidebar.dto';

export class UpdateSidebarDto extends PartialType(CreateSidebarDto) {}
