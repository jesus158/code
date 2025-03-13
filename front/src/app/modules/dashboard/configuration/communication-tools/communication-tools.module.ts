import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationToolsRoutingModule } from './communication-tools-routing.module';
import { ResponseTemplateComponent } from './response-template/response-template.component';
import { SalesbotComponent } from './salesbot/salesbot.component';
import { TrackClicksComponent } from './track-clicks/track-clicks.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommunicationToolsComponent } from './communication-tools.component';
import { ModalResponseTemplateComponent } from './response-template/components-response-template/modal-response-template/modal-response-template.component';
import { ModalSalesbotComponent } from './salesbot/components-salesbot/modal-salesbot/modal-salesbot.component';

@NgModule({
  declarations: [
    ResponseTemplateComponent,
    SalesbotComponent,
    TrackClicksComponent,
    CommunicationToolsComponent,
    ModalResponseTemplateComponent,
    ModalSalesbotComponent,
  ],
  imports: [
    CommonModule,
    CommunicationToolsRoutingModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommunicationToolsModule {}
