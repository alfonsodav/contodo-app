import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AwardsPageRoutingModule } from './awards-routing.module';

import { AwardsPage, ModalComponent } from './awards.page';
import { ShareModule } from 'src/app/share/share.module';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ClaimedComponent } from './claimed/claimed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AwardsPageRoutingModule,
    ShareModule
  ],
  declarations: [AwardsPage, ModalComponent, ClaimedComponent],
  providers: [SocialSharing]
})
export class AwardsPageModule {}
