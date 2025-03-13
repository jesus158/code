export interface Customer {
  customer_uid?: string | null | undefined;

  customer_company?: string | null | undefined;

  customer_name?: string | null | undefined;

  customer_last_name?: string | null | undefined;

  customer_description?: string | null | undefined;

  customer_number_phone?: string | null | undefined;

  customer_email?: string | null | undefined;

  customer_last_follow_up?: string | null | undefined;

  customer_assigned_to?: string | null | undefined;

  business_uid?: string | null | undefined;

  /* Dates */
  customer_save_date?: Date | null | undefined;

  customer_update_date?: Date | null | undefined;

  customer_delete_date?: Date | null | undefined;

  customer_is_delete?: boolean | null | undefined;

  response?: any | null | undefined;
}
