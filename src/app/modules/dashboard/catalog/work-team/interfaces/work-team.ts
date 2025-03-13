import { Business } from 'src/app/modules/business/interfaces/business';

export interface WorkTeamResponse {
  response?: WorkTeam[];
}

export interface WorkTeam {
  work_team_uid?: string | null | undefined;

  work_team_name?: string | null | undefined;

  work_team_description?: string | null | undefined;

  business?: Business;

  /* Dates */
  work_team_save_date?: Date | null | undefined;

  work_team_update_date?: Date | null | undefined;

  work_team_delete_date?: Date | null | undefined;

  work_team_is_delete?: boolean | null | undefined;
}
