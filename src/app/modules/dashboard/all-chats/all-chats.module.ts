import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllChatsRoutingModule } from './all-chats-routing.module';
import { ChatLeadsComponent } from './chat-leads/chat-leads.component';
import { IncomingLeadsComponent } from './incoming-leads/incoming-leads.component';
import { LeadDescriptionComponent } from './lead-description/lead-description.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { AllChatsComponent } from './all-chats.component';
import { ChatLeadsMessagesComponent } from './chat-leads/chat-leads-messages/chat-leads-messages.component';

@NgModule({
  declarations: [
    AllChatsComponent,
    ChatLeadsComponent,
    IncomingLeadsComponent,
    LeadDescriptionComponent,
    ChatLeadsMessagesComponent,
  ],
  imports: [CommonModule, AllChatsRoutingModule, DesignLibrariesModule],
})
export class AllChatsModule {}
