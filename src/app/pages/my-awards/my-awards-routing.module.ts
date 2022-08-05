import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAwardsPage } from './my-awards.page';

const routes: Routes = [
  {
    path: '',
    component: MyAwardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAwardsPageRoutingModule {}
