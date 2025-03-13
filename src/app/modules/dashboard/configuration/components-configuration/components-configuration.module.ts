import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarConfigComponent } from './sidebar-config/sidebar-config.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';

@NgModule({
  declarations: [SidebarConfigComponent],
  imports: [CommonModule, DesignLibrariesModule],
  exports: [SidebarConfigComponent],
})
export class ComponentsConfigurationModule {}
