import { FollowUp } from '../../../interfaces/follow-up';

export interface ChecksResponse {
  response?: Checks[];
}
export interface Checks {
  checks_uid?: string | null | undefined;

  checks_description?: string | null | undefined;

  checks_is_active?: boolean | null | undefined;

  is_lead?: boolean | null | undefined;

  is_follow_up?: boolean | null | undefined;

  follow_up?: FollowUp;

  /* Dates */

  checks_save_date?: Date | null | undefined;

  checks_update_date?: Date | null | undefined;

  checks_delete_date?: Date | null | undefined;

  checks_is_delete?: boolean | null | undefined;
}
