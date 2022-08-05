import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicityPageRoutingModule } from './publicity-routing.module';

import { PublicityPage } from './publicity.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicityPageRoutingModule
  ],
  declarations: [PublicityPage],
  providers: []
})
export class PublicityPageModule {}
