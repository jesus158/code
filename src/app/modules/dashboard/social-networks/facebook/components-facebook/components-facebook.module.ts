import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban/kanban.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { ComponentsKanbanModule } from './kanban/components-kanban/components-kanban.module';
import { AssignedComponent } from './assigned/assigned.component';
import { NoAssignedComponent } from './no-assigned/no-assigned.component';
import { ListFacebookComponent } from './list-facebook/list-facebook.component';

@NgModule({
  declarations: [
    ListFacebookComponent,
    KanbanComponent,
    AssignedComponent,
    NoAssignedComponent,
  ],
  imports: [CommonModule, DesignLibrariesModule, ComponentsKanbanModule],
  exports: [KanbanComponent],
})
export class ComponentsFacebookModule {}
