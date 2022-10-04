import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
// firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/index';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    AngularFireAuthModule,
    AngularFireModule,
  ],
  declarations: [LoginPage],
  providers: [
  ],
})
export class LoginPageModule {}
