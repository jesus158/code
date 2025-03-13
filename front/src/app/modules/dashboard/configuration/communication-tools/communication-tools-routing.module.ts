import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationToolsComponent } from './communication-tools.component';

const routes: Routes = [
  { path: 'tools', component: CommunicationToolsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationToolsRoutingModule {}
