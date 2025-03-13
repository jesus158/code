import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsModule } from './charts/charts.module';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, ChartsModule, DesignLibrariesModule],
  exports: [SidebarComponent, NavbarComponent, FooterComponent, ChartsModule],
})
export class ComponentsDashboardModule {}
