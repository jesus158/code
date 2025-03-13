import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsKanbanModule } from './kanban/components-kanban/components-kanban.module';
import { KanbanComponent } from './kanban/kanban.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { LeadsActiveComponent } from './leads-active/leads-active.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadsFilesComponent } from './leads-files/leads-files.component';
import { LeadsCheckListComponent } from './leads-check-list/leads-check-list.component';
import { LeadsCommentsComponent } from './leads-comments/leads-comments.component';
import { ComponentsLeadsFilesModule } from './leads-files/components-leads-files/components-leads-files.module';
import { LeadsCalendarComponent } from './leads-calendar/leads-calendar.component';
import { LeadsContentComponent } from './leads-content/leads-content.component';

@NgModule({
  declarations: [
    KanbanComponent,
    LeadsActiveComponent,
    LeadsFilesComponent,
    LeadsCheckListComponent,
    LeadsCommentsComponent,
    LeadsCalendarComponent,
    LeadsContentComponent,
  ],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    RouterModule,
    ComponentsKanbanModule,
    ComponentsLeadsFilesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [KanbanComponent, LeadsContentComponent],
})
export class ComponentsLeadsModule {}
