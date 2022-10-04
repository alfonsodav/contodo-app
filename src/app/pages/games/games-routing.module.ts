import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandyComponent } from './candy/candy.component';

import { GamesPage } from './games.page';

const routes: Routes = [
  {
    path: '',
    component: GamesPage
  },
  {
    path: 'crush',
    component: CandyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesPageRoutingModule {}
