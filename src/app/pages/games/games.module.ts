import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesPageRoutingModule } from './games-routing.module';

import { GamesPage } from './games.page';
import { ShareModule } from 'src/app/share/share.module';
import { CandyComponent, FrameComponent } from './candy/candy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesPageRoutingModule,
    ShareModule
  ],
  declarations: [GamesPage, CandyComponent, FrameComponent]
})
export class GamesPageModule {}
