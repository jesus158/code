import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { DesignLibrariesModule } from '../../design-libraries/design-libraries.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CalendarRoutingModule, DesignLibrariesModule],
})
export class CalendarModule {}
