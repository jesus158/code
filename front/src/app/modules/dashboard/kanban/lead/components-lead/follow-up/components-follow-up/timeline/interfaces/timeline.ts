import { FollowUp } from '../../../interfaces/follow-up';

export interface TimelineResponse {
  response?: Timeline[];
}

export interface Timeline {
  timelines_uid?: string | null | undefined;

  timelines_description?: string | null | undefined;

  timelines_is_complete?: boolean | null | undefined;

  is_lead?: boolean | null | undefined;

  is_follow_up?: boolean | null | undefined;

  follow_up?: FollowUp;

  /* Dates */

  timelines_save_date?: Date | null | undefined;

  timelines_update_date?: Date | null | undefined;

  timelines_delete_date?: Date | null | undefined;

  timelines_is_delete?: boolean | null | undefined;
}
