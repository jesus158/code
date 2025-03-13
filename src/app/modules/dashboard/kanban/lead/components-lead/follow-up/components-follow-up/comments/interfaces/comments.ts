import { FollowUp } from '../../../interfaces/follow-up';

export interface CommentsResponse {
  response: Comments[];
}
export interface Comments {
  comments_uid?: string | null | undefined;

  comments_description?: string | null | undefined;

  comments_user_uid_receive?: string | null | undefined;

  comments_user_uid_send?: string | null | undefined;

  is_lead?: boolean | null | undefined;

  is_follow_up?: boolean | null | undefined;

  lead_uid?: string | null | undefined;

  follow_up_uid?: string | null | undefined;

  business_uid?: string | null | undefined;

  business_owner_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  follow_up?: FollowUp;

  /* Dates */

  comments_save_date?: Date | null | undefined;

  comments_update_date?: Date | null | undefined;

  comments_delete_date?: Date | null | undefined;

  comments_is_delete?: boolean | null | undefined;
}
