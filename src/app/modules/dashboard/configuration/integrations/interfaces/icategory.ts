import { Integrations } from './integrations';

export interface Icategory {
  category_uid?: string | null | undefined;

  category_name?: string | null | undefined;

  business_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  integrations?: Integrations[];

  /* Dates */
  category_save_date?: Date | null | undefined;

  category_update_date?: Date | null | undefined;

  category_delete_date?: Date | null | undefined;

  category_is_delete?: boolean | null | undefined;

  response?: any;
}
