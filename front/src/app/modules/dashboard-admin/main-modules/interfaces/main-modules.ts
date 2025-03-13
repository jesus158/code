import { PermissionsModule } from 'src/app/modules/account/components-account/permissions-module/interfaces/permissions-module';
import { Permissions } from 'src/app/modules/account/components-account/permissions/interfaces/permissions';

export interface MainModulesResponse {
  response?: MainModules[];
}

export interface MainModules {
  main_module_uid?: string;

  main_module_description?: string;

  main_module_ico?: string;

  /* A main module can only have many permissions */
  permissions?: Permissions[];

  /* A main module can only have many permissions module */
  permissions_module?: PermissionsModule[];

  /* Dates */
  main_module_save_date?: Date;

  main_module_update_date?: Date;

  main_module_delete_date?: Date;

  main_module_is_delete?: boolean;
}
