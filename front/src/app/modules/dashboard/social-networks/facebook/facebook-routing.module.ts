import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookComponent } from './facebook.component';
import { AssignedComponent } from './components-facebook/assigned/assigned.component';
import { NoAssignedComponent } from './components-facebook/no-assigned/no-assigned.component';

const routes: Routes = [
  {
    path: 'facebook',
    component: FacebookComponent,
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
export class FacebookRoutingModule {}
