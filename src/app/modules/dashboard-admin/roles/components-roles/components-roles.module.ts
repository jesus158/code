import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RolesFormComponent],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RolesFormComponent],
})
export class ComponentsRolesModule {}
