import { Business } from 'src/app/modules/business/interfaces/business';

export interface WorkstationResponse {
  response?: Workstation[];
}

export interface Workstation {
  workstation_uid?: string | null | undefined;

  workstation_description?: string | null | undefined;

  business?: Business;

  /* Dates */
  workstation_save_date?: Date | null | undefined;

  workstation_update_date?: Date | null | undefined;

  workstation_delete_date?: Date | null | undefined;

  workstation_is_delete?: boolean | null | undefined;
}
