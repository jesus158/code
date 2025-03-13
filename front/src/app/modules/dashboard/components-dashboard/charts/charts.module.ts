import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';

@NgModule({
  declarations: [BarChartsComponent, PieChartsComponent],
  imports: [CommonModule, DesignLibrariesModule],
  exports: [BarChartsComponent, PieChartsComponent],
})
export class ChartsModule {}
