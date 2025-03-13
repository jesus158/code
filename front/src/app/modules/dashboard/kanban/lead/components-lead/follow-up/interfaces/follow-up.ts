import { Status } from '../../../../status/interfaces/status';
import { Lead } from '../../../interfaces/lead';
import { Activities } from '../components-follow-up/activities/interfaces/activities';
import { Checks } from '../components-follow-up/checks/interfaces/checks';
import { Comments } from '../components-follow-up/comments/interfaces/comments';
import { Files } from '../components-follow-up/files/interfaces/files';
import { Timeline } from '../components-follow-up/timeline/interfaces/timeline';

export interface FollowUpResponse {
  response?: FollowUp[];
}

export interface FollowUp {
  follow_up_uid?: string | null | undefined;

  follow_up_code_generated?: string | null | undefined;

  follow_up_number_generated?: number | null | undefined;

  lead_uid?: string | null | undefined;

  status_uid?: string | null | undefined;
  /* A follow up can only have one kanban list */
  lead?: Lead;

  status?: Status;

  /* A lead can have many activities */
  activity?: Activities[];

  /* A lead can have many check lead */
  checks?: Checks[];

  /* A lead can have many comments */
  comments?: Comments[];

  /* A lead can have many files */
  file?: Files[];

  /* A lead can have many timeline */
  timeline?: Timeline[];

  /* Dates */

  follow_up_save_date?: Date | null | undefined;

  follow_up_update_date?: Date | null | undefined;

  follow_up_delete_date?: Date | null | undefined;

  follow_up_is_delete?: boolean | null | undefined;
}
