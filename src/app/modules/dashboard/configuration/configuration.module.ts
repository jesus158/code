import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';
import { ComponentsConfigurationModule } from './components-configuration/components-configuration.module';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    DesignLibrariesModule,
    ComponentsConfigurationModule,
  ],
})
export class ConfigurationModule {}
