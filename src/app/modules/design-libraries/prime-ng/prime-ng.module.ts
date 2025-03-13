import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  exports: [
    AvatarModule,
    BadgeModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ChartModule,
    ColorPickerModule,
    FileUploadModule,
    DialogModule,
    DynamicDialogModule,
    RippleModule,
    ChipModule,
    ConfirmDialogModule,
    MessagesModule,
    CalendarModule,
    DividerModule,
    InputTextareaModule,
    InputNumberModule,
    ToastModule,
    DropdownModule,
    TableModule,
    TabViewModule,
    CheckboxModule,
    TooltipModule,
    InputSwitchModule,
    AutoCompleteModule,
  ],
})
export class PrimeNgModule {}
