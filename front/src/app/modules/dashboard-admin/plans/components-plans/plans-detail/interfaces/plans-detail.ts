import { Plans } from '../../../interfaces/plans';

export interface PlansDetailResponse {
  response?: PlansDetail[];
}

export interface PlansDetail {
  plans_detail_uid?: string | null | undefined;

  plans_detail_description?: string | null | undefined;

  plans?: Plans;

  /* Dates */
  plans_detail_save_date?: Date | null | undefined;

  plans_detail_update_date?: Date | null | undefined;

  plans_detail_delete_date?: Date | null | undefined;

  plans_detail_is_delete?: boolean | null | undefined;
}
