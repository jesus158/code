import { FollowUp } from '../../../interfaces/follow-up';

export interface FilesResponse {
  response?: Files[];
}

export interface Files {
  files_uid?: string | null | undefined;

  files_name?: string | null | undefined;

  files_type?: string | null | undefined;

  files_url?: string | null | undefined;

  files_url_default?: string | null | undefined;

  is_lead?: boolean | null | undefined;

  is_follow_up?: boolean | null | undefined;

  follow_up?: FollowUp;

  /* Dates */

  files_save_date?: Date | null | undefined;

  files_update_date?: Date | null | undefined;

  files_delete_date?: Date | null | undefined;

  files_is_delete?: boolean | null | undefined;
}
