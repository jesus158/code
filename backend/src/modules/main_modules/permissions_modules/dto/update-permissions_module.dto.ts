import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionsModuleDto } from './create-permissions_module.dto';

export class UpdatePermissionsModuleDto extends PartialType(
  CreatePermissionsModuleDto,
) {}
