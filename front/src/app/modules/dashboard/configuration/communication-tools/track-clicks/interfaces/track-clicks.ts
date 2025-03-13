import { Business } from 'src/app/modules/business/interfaces/business';

export interface TrackClicks {
  track_click_uid?: string | null | undefined;

  track_click_description?: string | null | undefined;

  track_click_is_active?: string | null | undefined;

  /* A track clicks can only have one business */
  business?: Business;

  /* Dates */

  track_click_save_date?: Date | null | undefined;

  track_click_update_date?: Date | null | undefined;

  track_click_delete_date?: Date | null | undefined;

  track_click_is_delete?: boolean | null | undefined;
}
