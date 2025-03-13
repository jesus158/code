import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { ComponentsCatalogComponent } from './components-catalog/components-catalog.component';
import { CatalogComponent } from './catalog.component';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';

@NgModule({
  declarations: [ComponentsCatalogComponent, CatalogComponent],
  imports: [CommonModule, DesignLibrariesModule, CatalogRoutingModule],
})
export class CatalogModule {}
