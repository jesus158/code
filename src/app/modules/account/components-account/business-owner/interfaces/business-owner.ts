import { Business } from 'src/app/modules/business/interfaces/business';
import { User } from '../../user/interfaces/user';
import { Subscription } from '../../subscriptions/interfaces/subscription';
export interface BusinessOwnerResponse {
  response?: BusinessOwner[];
}
export interface BusinessOwner {
  business_owner_uid?: string | null | undefined;

  business_owner_firts_name?: string | null | undefined;

  business_owner_last_name?: string | null | undefined;

  business_owner_number_phone?: string | null | undefined;

  business_owner_email?: string | null | undefined;

  business_owner_password?: string | null | undefined;

  business_owner_birthday?: Date | null | undefined;

  business_owner_country?: string | null | undefined;

  business_owner_username?: string | null | undefined;

  /* A business owner can have multiple users */
  users?: User[];

  /* A business owner can have multiple businesses */
  business?: Business[];

  /* A business owner can have multiple plans */
  subscription?: Subscription;

  /* Dates */
  business_owner_save_date?: Date | null | undefined;

  business_owner_update_date?: Date | null | undefined;

  business_owner_delete_date?: Date | null | undefined;

  business_owner_is_delete?: boolean | null | undefined;
}
