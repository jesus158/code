import { LeadsCheckList } from '../components-leads/leads-check-list/interfaces/leads-check-list';
import { LeadsFiles } from '../components-leads/leads-files/interfaces/leads-files';

export interface Leads {
  leads_uid?: string | null | undefined;

  leads_name?: string | null | undefined;

  leads_last_name?: string | null | undefined;

  leads_code_generated?: string | null | undefined;

  leads_number_generated?: number | null | undefined;

  leads_email?: string | null | undefined;

  leads_description?: string | null | undefined;

  leads_company?: string | null | undefined;

  leads_work_position?: string | null | undefined;

  leads_office_phone?: string | null | undefined;

  leads_contact_social_network?: string | null | undefined;

  leads_budget?: string | null | undefined;

  leads_expected_income?: string | null | undefined;

  leads_assigned_to?: string | null | undefined;

  leads_last_follow_up?: Date | null | undefined;

  business_uid?: string | null | undefined;

  kanban_status_uid?: string | null | undefined;

  is_customer?: boolean | null | undefined;

  /* Dates */
  leads_save_date?: Date | null | undefined;

  leads_update_date?: Date | null | undefined;

  leads_delete_date?: Date | null | undefined;

  leads_is_delete?: boolean | null | undefined;

  response?: any | null | undefined;

  leads_activities?: any[];

  leads_files?: LeadsFiles[];

  leads_check_list?: LeadsCheckList[];

  leads_timeline?: any[];
}
