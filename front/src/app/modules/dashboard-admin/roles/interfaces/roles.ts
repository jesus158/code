export interface Roles {
  roles_uid?: string | null | undefined;

  roles_name?: string | null | undefined;

  roles_logo_url?: string | null | undefined;

  business_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  is_default?: string | null | undefined;

  /* Dates */
  roles_save_date?: Date | null | undefined;

  roles_update_date?: Date | null | undefined;

  roles_delete_date?: Date | null | undefined;

  roles_is_delete?: boolean | null | undefined;

  response?: any | null | undefined;
}
