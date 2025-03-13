import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationsComponent } from './integrations.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';

@NgModule({
  declarations: [IntegrationsComponent],
  imports: [CommonModule, IntegrationsRoutingModule, DesignLibrariesModule],
})
export class IntegrationsModule {}
