import { Plans } from 'src/app/modules/dashboard-admin/plans/interfaces/plans';
import { BusinessOwner } from '../../business-owner/interfaces/business-owner';
import { Business } from 'src/app/modules/business/interfaces/business';

export interface SubscriptionResponse {
  response?: Subscription[];
}

export interface Subscription {
  subscriptions_uid?: string | null | undefined;

  subscriptions_description?: string | null | undefined;

  subscriptions_quantity?: number | null | undefined;

  subscriptions_month?: number | null | undefined;

  subscriptions_month_price?: number | null | undefined;

  subscriptions_number_licenses?: number | null | undefined;

  subscriptions_total_to_pay?: number | null | undefined;

  subscriptions_start_date?: Date | null | undefined;

  subscriptions_count_of_days?: number | null | undefined;

  subscriptions_finish_date?: Date | null | undefined;

  business_owner?: BusinessOwner;

  business?: Business;

  plan?: Plans;

  plans?: Plans[];

  /* Dates */
  subscriptions_save_date?: Date | null | undefined;

  subscriptions_update_date?: Date | null | undefined;

  subscriptions_delete_date?: Date | null | undefined;

  subscriptions_is_delete?: boolean | null | undefined;
}
