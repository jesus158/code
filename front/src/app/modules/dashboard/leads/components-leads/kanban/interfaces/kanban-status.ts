export interface KanbanStatus {
  kanban_status_uid?: string | null | undefined;

  kanban_status_description?: string | null | undefined;

  business_uid?: string | null | undefined;

  db_access?: string | null | undefined;

  /* Dates */
  kanban_status_save_date?: Date | null | undefined;

  kanban_status_update_date?: Date | null | undefined;

  kanban_status_delete_date?: Date | null | undefined;

  kanban_status_is_delete?: boolean | null | undefined;

  response?: any | null | undefined;
}
