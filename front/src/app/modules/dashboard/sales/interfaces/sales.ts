import { Business } from 'src/app/modules/business/interfaces/business';
import { Leads } from '../../leads/interfaces/leads';

export interface SalesResponse {
  response?: Sales[];
}

export interface Sales {
  sales_uid?: string;

  sales_price?: number;

  sales_quantity?: number;

  sales_description?: string;

  sales_type?: string;

  /* A sale can only have one business */
  business?: Business;

  /* A sale can only have one customer */
  /* It connects to lead, since leads become customers to obtain
   the same information and avoid data redundancy. */
  lead?: Leads;

  /* Dates */
  sales_save_date?: Date;

  sales_update_date?: Date;

  sales_delete_date?: Date;

  sales_is_delete?: boolean;
}
