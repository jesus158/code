import { BusinessOwner } from 'src/app/modules/account/components-account/business-owner/interfaces/business-owner';
import { Office } from '../../dashboard/catalog/office/interface/office';
import { Staff } from '../../dashboard/catalog/staff/interfaces/staff';
import { WorkTeam } from '../../dashboard/catalog/work-team/interfaces/work-team';
import { Workstation } from '../../dashboard/catalog/workstation/interfaces/workstation';
import { ResponseTemplate } from '../../dashboard/configuration/communication-tools/response-template/interfaces/response-template';
import { Salesbot } from '../../dashboard/configuration/communication-tools/salesbot/interfaces/salesbot';
import { TrackClicks } from '../../dashboard/configuration/communication-tools/track-clicks/interfaces/track-clicks';
import { Icategory } from '../../dashboard/configuration/integrations/interfaces/icategory';
import { Status } from '../../dashboard/kanban/status/interfaces/status';
import { Sales } from '../../dashboard/sales/interfaces/sales';
import { Preferences } from '../../account/components-account/preferences/interfaces/preferences';
import { Subscription } from '../../account/components-account/subscriptions/interfaces/subscription';
import { User } from '../../account/components-account/user/interfaces/user';

export interface BusinessResponse {
  response?: Business[];
}

export interface Business {
  business_uid?: string | null | undefined;

  business_corporate_email?: string | null | undefined;

  business_name?: string | null | undefined;

  business_description?: string | null | undefined;

  business_image?: string | null | undefined;

  business_file_name?: string | null | undefined;

  business_file_name_delete?: string | null | undefined;

  /* A business can only have one owner */
  business_owner?: BusinessOwner;

  user?: User;

  subscription?: Subscription[];

  /* A business can have many offices */
  office?: Office[];

  /* A business can have many staff */
  staff?: Staff[];

  /* A business can have many work team */
  workteam?: WorkTeam[];

  /* A business can have many workstation */
  workstation?: Workstation[];

  /* A business can have many customers */
  sale?: Sales[];

  /* A business can have many status kanban */
  status?: Status[];

  /* A business can have many preferences */
  preferences?: Preferences[];

  /* A business can have many icategory */
  icategory?: Icategory[];

  response_template?: ResponseTemplate[];

  /* A business can have many salesbot */
  salesbot?: Salesbot[];

  /* A business can have many track clicks */
  track_clicks?: TrackClicks;

  /* Dates */
  business_save_date?: Date | null | undefined;

  business_update_date?: Date | null | undefined;

  business_delete_date?: Date | null | undefined;

  business_is_delete?: boolean | null | undefined;

  file?: any;
}
