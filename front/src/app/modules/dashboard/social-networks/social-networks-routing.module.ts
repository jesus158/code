import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../modules/dashboard/social-networks/facebook/facebook.module'
      ).then((m) => m.FacebookModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../modules/dashboard/social-networks/instagram/instagram.module'
      ).then((m) => m.InstagramModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../modules/dashboard/social-networks/whatsapp/whatsapp.module'
      ).then((m) => m.WhatsappModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialNetworksRoutingModule {}
