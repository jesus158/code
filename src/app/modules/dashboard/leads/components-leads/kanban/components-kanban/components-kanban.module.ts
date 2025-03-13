import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoModalComponent } from './to-do-modal/to-do-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoListModalComponent } from './to-do-list-modal/to-do-list-modal.component';

@NgModule({
  declarations: [
    ToDoComponent,
    ToDoListComponent,
    ToDoModalComponent,
    ToDoListModalComponent,
  ],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ToDoComponent],
})
export class ComponentsKanbanModule {}
