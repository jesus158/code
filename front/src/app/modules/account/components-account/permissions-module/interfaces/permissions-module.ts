import { MainModules } from 'src/app/modules/dashboard-admin/main-modules/interfaces/main-modules';
import { User } from '../../user/interfaces/user';

export interface PermissionsModule {
  permissions_module_uid?: string;

  has_access?: boolean;

  /* A permission can only have one user */
  user?: User;

  /* A permission user can only have one permission */
  main_module?: MainModules;

  /* Dates */
  permissions_module_save_date?: Date;

  permissions_module_update_date?: Date;

  permissions_module_delete_date?: Date;

  permissions_module_is_delete?: boolean;
}
