import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookRoutingModule } from './facebook-routing.module';
import { FacebookComponent } from './facebook.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { ComponentsFacebookModule } from './components-facebook/components-facebook.module';

@NgModule({
  declarations: [FacebookComponent],
  imports: [
    CommonModule,
    FacebookRoutingModule,
    DesignLibrariesModule,
    ComponentsFacebookModule,
  ],
})
export class FacebookModule {}
