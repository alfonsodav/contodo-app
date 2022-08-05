import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicityPage } from './publicity.page';

const routes: Routes = [
  {
    path: '',
    component: PublicityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicityPageRoutingModule {}
