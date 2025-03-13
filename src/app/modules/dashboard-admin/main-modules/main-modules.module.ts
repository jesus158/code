import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModulesRoutingModule } from './main-modules-routing.module';
import { MainModulesComponent } from './main-modules.component';


@NgModule({
  declarations: [
    MainModulesComponent
  ],
  imports: [
    CommonModule,
    MainModulesRoutingModule
  ]
})
export class MainModulesModule { }
