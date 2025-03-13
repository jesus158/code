import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban/kanban.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { ComponentsKanbanModule } from './kanban/components-kanban/components-kanban.module';
import { NoAssignedComponent } from './no-assigned/no-assigned.component';
import { AssignedComponent } from './assigned/assigned.component';
import { ListInstagramComponent } from './list-instagram/list-instagram.component';

@NgModule({
  declarations: [
    ListInstagramComponent,
    KanbanComponent,
    NoAssignedComponent,
    AssignedComponent,
  ],
  imports: [CommonModule, DesignLibrariesModule, ComponentsKanbanModule],
  exports: [KanbanComponent],
})
export class ComponentsInstagramModule {}
