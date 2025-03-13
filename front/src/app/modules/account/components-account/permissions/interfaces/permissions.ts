import { Business } from 'src/app/modules/business/interfaces/business';
import { User } from '../../user/interfaces/user';

export interface Permissions {
  permissions_uid?: string;

  is_show_view?: boolean;

  is_get?: boolean;

  is_save?: boolean;

  is_edit?: boolean;

  is_delete?: boolean;

  /* A permission can only have many permission users */
  user?: User[];

  /* A permission can only have one main modules */
  /*  main_module?: MainModules; */

  /* A permission can only have one business */
  business?: Business;

  /* Dates */
  permissions_save_date?: Date;

  permissions_update_date?: Date;

  permissions_delete_date?: Date;

  permissions_is_delete?: boolean;
}
