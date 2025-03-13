import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsFollowUpModule } from './components-follow-up/components-follow-up.module';
import { FollowUpComponent } from './follow-up.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsLeadModule } from '../components-lead.module';
import { LeadOptionsComponent } from 'src/app/components/lead-options/lead-options.component';

@NgModule({
  declarations: [FollowUpComponent],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsFollowUpModule,
    LeadOptionsComponent,
  ],
  exports: [FollowUpComponent, ComponentsFollowUpModule],
})
export class FollowUpModule {}
