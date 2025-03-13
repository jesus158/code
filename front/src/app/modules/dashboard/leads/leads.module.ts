import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from './leads.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { ComponentsLeadsModule } from './components-leads/components-leads.module';
@NgModule({
  declarations: [LeadsComponent],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    DesignLibrariesModule,
    ComponentsLeadsModule,
  ],
})
export class LeadsModule {}
