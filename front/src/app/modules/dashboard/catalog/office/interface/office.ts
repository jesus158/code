import { Business } from 'src/app/modules/business/interfaces/business';

export interface OfficeResponse {
  response?: Office[];
}

export interface Office {
  office_uid?: string | null | undefined;

  office_number?: string | null | undefined;

  office_manager?: string | null | undefined;

  office_location?: string | null | undefined;

  office_observations?: string | null | undefined;

  business?: Business;

  /* Dates */
  office_save_date?: Date | null | undefined;

  office_update_date?: Date | null | undefined;

  office_delete_date?: Date | null | undefined;

  office_is_delete?: boolean | null | undefined;

  user?: any;
}
