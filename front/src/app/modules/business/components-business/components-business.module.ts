import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHeaderComponent } from './business-header/business-header.component';
import { BusinessFooterComponent } from './business-footer/business-footer.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';

@NgModule({
  declarations: [BusinessHeaderComponent, BusinessFooterComponent],
  imports: [CommonModule, DesignLibrariesModule],
  exports: [BusinessHeaderComponent, BusinessFooterComponent],
})
export class ComponentsBusinessModule {}
