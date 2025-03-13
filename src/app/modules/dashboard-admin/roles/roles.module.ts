import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { ComponentsRolesModule } from './components-roles/components-roles.module';

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ComponentsRolesModule,
    DesignLibrariesModule,
  ],
})
export class RolesModule {}
