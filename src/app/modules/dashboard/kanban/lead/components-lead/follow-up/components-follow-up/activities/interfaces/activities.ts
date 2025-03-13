import { FollowUp } from '../../../interfaces/follow-up';

export interface ActivitiesResponse {
  response?: Activities[];
}

export interface Activities {
  activities_uid?: string | null | undefined;

  activities_description?: string | null | undefined;

  activities_who_assigned?: string | null | undefined;

  activities_assign_to?: any;
  activities_type?: any;

  activities_is_active?: boolean | null | undefined;

  is_lead?: boolean | null | undefined;

  is_follow_up?: boolean | null | undefined;

  follow_up?: FollowUp;

  /* Dates */

  activities_save_date?: Date | null | undefined;

  activities_update_date?: Date | null | undefined;

  activities_delete_date?: Date | null | undefined;

  activities_is_delete?: boolean | null | undefined;
}
