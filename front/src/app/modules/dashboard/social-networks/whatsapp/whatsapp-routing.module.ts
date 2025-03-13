import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatsappComponent } from './whatsapp.component';
import { AssignedComponent } from './components-whatsapp/assigned/assigned.component';
import { NoAssignedComponent } from './components-whatsapp/no-assigned/no-assigned.component';

const routes: Routes = [
  {
    path: 'whatsapp',
    component: WhatsappComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'assigned' },
      { path: 'assigned', component: AssignedComponent },
      { path: 'no-assigned', component: NoAssignedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsappRoutingModule {}
