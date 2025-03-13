import { Business } from 'src/app/modules/business/interfaces/business';
import { FollowUp } from '../../lead/components-lead/follow-up/interfaces/follow-up';
import { Lead } from '../../lead/interfaces/lead';

export interface StatusResponse {
  response?: Status[];
}

export interface Status {
  status_uid?: string | null | undefined;

  status_description?: string | null | undefined;

  is_lead?: boolean | null | undefined;

  is_follow_up?: boolean | null | undefined;

  /* A kanban can only have one business */
  business?: Business;

  /* A status can have many list */
  lead?: Lead[] | null | undefined;

  follow_up?: FollowUp[] | null | undefined;

  /* Dates */
  status_save_date?: Date | null | undefined;

  status_update_date?: Date | null | undefined;

  status_delete_date?: Date | null | undefined;

  status_is_delete?: boolean | null | undefined;
}
