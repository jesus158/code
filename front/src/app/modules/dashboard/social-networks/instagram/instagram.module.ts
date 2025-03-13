import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstagramRoutingModule } from './instagram-routing.module';
import { InstagramComponent } from './instagram.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { ComponentsInstagramModule } from './components-instagram/components-instagram.module';

@NgModule({
  declarations: [InstagramComponent],
  imports: [
    CommonModule,
    InstagramRoutingModule,
    DesignLibrariesModule,
    ComponentsInstagramModule,
  ],
})
export class InstagramModule {}
