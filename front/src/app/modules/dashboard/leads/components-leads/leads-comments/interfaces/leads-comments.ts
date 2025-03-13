export interface LeadsComments {
  lead_comments_uid?: string | null | undefined;

  lead_comments_description?: string | null | undefined;

  lead_comments_user_uid_receive?: string | null | undefined;

  lead_comments_user_uid_send?: string | null | undefined;

  leads_uid?: string | null | undefined;

  business_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  /* Dates */

  lead_comments_save_date?: Date | null | undefined;

  lead_comments_update_date?: Date | null | undefined;

  lead_comments_delete_date?: Date | null | undefined;

  lead_comments_is_delete?: boolean | null | undefined;

  response?: any | null | undefined;
}
