import { Icategory } from './icategory';

export interface Integrations {
  integrations_uid?: string | null | undefined;

  integrations_name?: string | null | undefined;

  integrations_image?: string | null | undefined;

  is_instaled?: boolean | null | undefined;

  business_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  background_color?: string | null | undefined;

  button_color?: string | null | undefined;

  icon_color?: string | null | undefined;

  category_uid?: string | null | undefined;

  category?: Icategory | null | undefined;

  /* Dates */
  integrations_save_date?: Date | null | undefined;

  integrations_update_date?: Date | null | undefined;

  integrations_delete_date?: Date | null | undefined;

  integrations_is_delete?: boolean | null | undefined;

  response?: any;
}
