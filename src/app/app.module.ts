import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AngularFireAuthModule,
  USE_DEVICE_LANGUAGE,
} from '@angular/fire/compat/auth';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { firebaseConfig } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: AUTH_SETTINGS,
      useValue: { appVerificationDisabledForTesting: true },
    },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    GooglePlus
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
