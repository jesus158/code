import { BusinessOwner } from 'src/app/modules/account/components-account/business-owner/interfaces/business-owner';
import { Business } from 'src/app/modules/business/interfaces/business';
import { Permissions } from '../../permissions/interfaces/permissions';

export interface UserResponse {
  response?: User[];
}

export interface User {
  user_uid?: string | null | undefined;

  user_name?: string | null | undefined;

  user_group?: string | null | undefined;

  user_email?: string | null | undefined;

  user_lead?: string | null | undefined;

  user_contact?: string | null | undefined;

  user_company?: string | null | undefined;

  user_task?: string | null | undefined;

  user_status?: string | null | undefined;

  /* A user can have one business owner */
  business_owner?: BusinessOwner;

  /* A user can have many business */
  business?: Business[];

  /* A user can have many permission */
  permissions?: Permissions[];

  /* A user can have many notification */
  notification_send?: Notification[];

  /* A user can have many notification */
  notification_receive?: Notification[];

  /* Dates */
  user_save_date?: Date | null | undefined;

  user_update_date?: Date | null | undefined;

  user_delete_date?: Date | null | undefined;

  user_is_delete?: boolean | null | undefined;
}
