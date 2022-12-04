import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAwardsPageRoutingModule } from './my-awards-routing.module';

import { MyAwardsPage } from './my-awards.page';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAwardsPageRoutingModule,
    ShareModule
  ],
  declarations: [MyAwardsPage]
})
export class MyAwardsPageModule { }
