import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstagramComponent } from './instagram.component';
import { AssignedComponent } from './components-instagram/assigned/assigned.component';
import { NoAssignedComponent } from './components-instagram/no-assigned/no-assigned.component';

const routes: Routes = [
  {
    path: 'instagram',
    component: InstagramComponent,
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
export class InstagramRoutingModule {}
