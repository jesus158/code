import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralAdjustmentsComponent } from './general-adjustments/general-adjustments.component';
import { CustomizableMenuBarComponent } from './customizable-menu-bar/customizable-menu-bar.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivateProductsComponent } from './activate-products/activate-products.component';
import { ActivateLiveChatComponent } from './activate-live-chat/activate-live-chat.component';
import { ChatImboxComponent } from './chat-imbox/chat-imbox.component';
import { ModalMenuBarComponent } from './customizable-menu-bar/modal-menu-bar/modal-menu-bar.component';
import { ModalUserComponent } from './customizable-menu-bar/modal-user/modal-user.component';

@NgModule({
  declarations: [GeneralAdjustmentsComponent, CustomizableMenuBarComponent, ActivateProductsComponent, ActivateLiveChatComponent, ChatImboxComponent, ModalMenuBarComponent, ModalUserComponent],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [GeneralAdjustmentsComponent, CustomizableMenuBarComponent],
})
export class ComponentsPreferencesModule {}
