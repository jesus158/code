import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ng-zorro/ng-zorro.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgZorroModule, PrimeNgModule, AngularMaterialModule],
  exports: [NgZorroModule, PrimeNgModule, AngularMaterialModule],
})
export class DesignLibrariesModule {}
