import { Subscription } from 'src/app/modules/account/components-account/subscriptions/interfaces/subscription';
import { PlansDetail } from '../components-plans/plans-detail/interfaces/plans-detail';

export interface PlansResponse {
  response?: Plans[];
}

export interface Plans {
  plans_uid?: string | null | undefined;

  plans_name?: string | null | undefined;

  plans_price?: string | null | undefined;

  plans_description?: string | null | undefined;

  plans_detail?: PlansDetail[];

  subscription?: Subscription;

  /* Dates */
  plans_save_date?: Date | null | undefined;

  plans_update_date?: Date | null | undefined;

  plans_delete_date?: Date | null | undefined;

  plans_is_delete?: boolean | null | undefined;

  response?: any | null | undefined;
}
