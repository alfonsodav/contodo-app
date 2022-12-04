import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { ShareModule } from 'src/app/share/share.module';
import { RulesComponent } from 'src/app/share/rules/rules.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    ShareModule,
  ],
  declarations: [MenuPage, RulesComponent],
})
export class MenuPageModule { }
