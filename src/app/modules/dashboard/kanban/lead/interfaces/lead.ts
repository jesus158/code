import { Sales } from '../../../sales/interfaces/sales';
import { Status } from '../../status/interfaces/status';
import { FollowUp } from '../components-lead/follow-up/interfaces/follow-up';

export interface LeadResponse {
  response?: Lead[];
}
export interface Lead {
  lead_uid?: string | null | undefined;

  lead_name?: string | null | undefined;

  lead_last_name?: string | null | undefined;

  lead_code_generated?: string | null | undefined;

  lead_number_generated?: number;

  lead_email?: string | null | undefined;

  lead_description?: string | null | undefined;

  lead_company?: string | null | undefined;

  lead_work_position?: string | null | undefined;

  lead_office_phone?: string | null | undefined;
  
  lead_phone?: string | null | undefined;

  lead_contact_social_network?: string | null | undefined;

  lead_budget?: string | null | undefined;

  lead_expected_income?: string | null | undefined;

  lead_assigned_to?: string | null | undefined;

  lead_last_follow_up?: Date | null | undefined;

  is_leads?: boolean | null | undefined;

  is_customer?: boolean | null | undefined;

  status_uid?: string | null | undefined;

  /* A lead can only have one business */
  status?: Status;

  follow_up?: FollowUp[];

  sale?: Sales[];

  /* Dates */
  lead_save_date?: Date | null | undefined;

  lead_update_date?: Date | null | undefined;

  lead_delete_date?: Date | null | undefined;

  lead_is_delete?: boolean | null | undefined;
}
