import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { ToDoComponent } from './to-do/to-do.component';

@NgModule({
  declarations: [ToDoComponent],
  imports: [CommonModule, DesignLibrariesModule],
  exports: [ToDoComponent],
})
export class ComponentsKanbanModule {}
