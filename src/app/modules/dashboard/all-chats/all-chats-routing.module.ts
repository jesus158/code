import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllChatsComponent } from './all-chats.component';

const routes: Routes = [{ path: 'chats', component: AllChatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllChatsRoutingModule {}
