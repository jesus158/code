import { BusinessOwner } from 'src/app/modules/account/components-account/business-owner/interfaces/business-owner';
import { User } from 'src/app/modules/account/components-account/user/interfaces/user';

export interface AccessResponse {
  access?: Access;
  jwt_access?: string;
  expiresIn: string;
}

export interface Access {
  access_uid?: string | null | undefined;

  access_email?: string | null | undefined;

  access_password?: string | null | undefined;

  access_username?: string | null | undefined;

  username_or_email?: string | null | undefined;

  owner?: BusinessOwner;

  user?: User;

  /* Dates */
  access_save_date?: Date | null | undefined;

  access_update_date?: Date | null | undefined;

  access_delete_date?: Date | null | undefined;

  access_is_delete?: boolean | null | undefined;

  db_access?: string | null | undefined;

  db_name?: string | null | undefined;
}
