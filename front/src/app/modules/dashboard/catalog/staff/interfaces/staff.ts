import { Business } from 'src/app/modules/business/interfaces/business';
import { Workstation } from '../../workstation/interfaces/workstation';

export interface StaffResponse {
  response?: Staff[];
}

export interface Staff {
  staff_uid?: string | null | undefined;

  staff_name?: string | null | undefined;

  staff_last_name?: string | null | undefined;

  staff_number_phone?: string | null | undefined;

  staff_department?: string | null | undefined;

  staff_age?: number | null | undefined;

  staff_birthday?: string | null | undefined;

  business?: Business | null | undefined;

  workstation?: Workstation | null | undefined;

  /* Dates */
  staff_save_date?: Date | null | undefined;

  staff_update_date?: Date | null | undefined;

  staff_delete_date?: Date | null | undefined;

  staff_is_delete?: boolean | null | undefined;
}
