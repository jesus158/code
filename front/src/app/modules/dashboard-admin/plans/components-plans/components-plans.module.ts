import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansDetailComponent } from './plans-detail/plans-detail.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlansModalComponent } from './plans-modal/plans-modal.component';
import { PlansDetailModalComponent } from './plans-detail-modal/plans-detail-modal.component';

@NgModule({
  declarations: [
    PlansDetailComponent,
    PlansModalComponent,
    PlansDetailModalComponent,
  ],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PlansDetailComponent,
    PlansModalComponent,
    PlansDetailModalComponent,
  ],
})
export class ComponentsPlansModule {}
