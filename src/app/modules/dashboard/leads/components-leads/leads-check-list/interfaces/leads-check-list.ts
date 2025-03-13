export interface LeadsCheckList {
  lead_check_list_uid?: string | null | undefined;

  lead_check_list_description?: string | null | undefined;

  lead_check_list_is_active?: boolean | null | undefined;

  leads_uid?: string | null | undefined;

  business_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  /* Dates */

  lead_check_list_save_date?: Date | null | undefined;

  lead_check_list_update_date?: Date | null | undefined;

  lead_check_list_delete_date?: Date | null | undefined;

  lead_check_list_is_delete?: boolean | null | undefined;

  response?: any | null | undefined;
}
