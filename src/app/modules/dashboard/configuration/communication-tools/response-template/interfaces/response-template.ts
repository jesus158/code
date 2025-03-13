import { Business } from 'src/app/modules/business/interfaces/business';

export interface TemplateResponse {
  response?: ResponseTemplate[];
}

export interface ResponseTemplate {
  response_template_uid?: string | null | undefined;

  response_template_name?: string | null | undefined;

  response_template_response_text?: string | null | undefined;

  business?: Business;

  /* Dates */
  response_template_save_date?: Date | null | undefined;

  response_template_update_date?: Date | null | undefined;

  response_template_delete_date?: Date | null | undefined;

  response_template_is_delete?: boolean | null | undefined;
}
