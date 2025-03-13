import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsappRoutingModule } from './whatsapp-routing.module';
import { WhatsappComponent } from './whatsapp.component';
import { ListWhatsappComponent } from './components-whatsapp/list-whatsapp/list-whatsapp.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { ComponentsWhatsappModule } from './components-whatsapp/components-whatsapp.module';

@NgModule({
  declarations: [WhatsappComponent],
  imports: [
    CommonModule,
    WhatsappRoutingModule,
    DesignLibrariesModule,
    ComponentsWhatsappModule,
  ],
})
export class WhatsappModule {}
