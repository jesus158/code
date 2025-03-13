import { Business } from 'src/app/modules/business/interfaces/business';

export interface PreferencesResponse {
  response?: Preferences[];
}

export interface Preferences {
  preferences_uid?: string | null | undefined;

  preferences_activate_product_catalog?: boolean | null | undefined;

  prefrences_direct_chat?: boolean | null | undefined;

  preferences_title?: string | null | undefined;

  preferences_time_zone?: string | null | undefined;

  preferences_date_format?: string | null | undefined;

  preferences_time_format?: string | null | undefined;

  preferences_exchange_rate?: string | null | undefined;

  preferences_contact_name_format?: string | null | undefined;

  business_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  business?: Business;

  /* Dates */
  preferences_save_date?: Date | null | undefined;

  preferences_update_date?: Date | null | undefined;

  preferences_delete_date?: Date | null | undefined;

  preferences_is_delete?: boolean | null | undefined;
}
