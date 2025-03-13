import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsFilesModalComponent } from './leads-files-modal/leads-files-modal.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LeadsFilesModalComponent],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LeadsFilesModalComponent],
})
export class ComponentsLeadsFilesModule {}
