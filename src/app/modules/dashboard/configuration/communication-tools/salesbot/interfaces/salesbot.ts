import { Business } from 'src/app/modules/business/interfaces/business';

export interface SalesbotResponse {
  response?: Salesbot[];
}

export interface Salesbot {
  salesbot_uid?: string | null | undefined;

  salesbot_name?: string | null | undefined;

  salesbot_triggers?: string | null | undefined;

  salesbot_conversion_rate?: string | null | undefined;

  salesbot_full_release?: string | null | undefined;

  salesbot_active_sessions?: string | null | undefined;

  business?: Business;

  /* Dates */
  salesbot_save_date?: Date | null | undefined;

  salesbot_update_date?: Date | null | undefined;

  salesbot_delete_date?: Date | null | undefined;

  salesbot_is_delete?: boolean | null | undefined;
}
