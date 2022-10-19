import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
/* import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'; */
//import {AppsFlyer ,AFInit} from 'appsflyer-capacitor-plugin';
import { AdMob } from '@capacitor-community/admob';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Juegos', url: '/games' },
    { title: 'Premios', url: '/awards' },
    { title: 'Mis Premios', url: '/awards' },
    { title: 'Noticias', url: '/news' },
    { title: 'mi Perfil', url: '/user' },
  ];

  constructor(private platform: Platform) {
    this.initializeApp();
    this.initialize();
    /* this.platform.ready().then(() => {
        const afConfig: AFInit = {
          appID: 'io.spicyrocket.contodo', // replace with your app ID.
          devKey: 'HURM4Gq9PC8Y9mSgt3jisY', // replace with your dev key.
          isDebug: true,
          waitForATTUserAuthorization: 10, // for iOS 14 and higher
          minTimeBetweenSessions: 6, // default 5 sec
          registerOnDeepLink: true,
          registerConversionListener: true,
          registerOnAppOpenAttribution: false,
          deepLinkTimeout: 4000, // default 3000 ms
          useReceiptValidationSandbox: true, // iOS only
          useUninstallSandbox: true // iOS only
        };

        AppsFlyer.initSDK(afConfig).then(res => console.log('appsFlyer init:', JSON.stringify(res))).catch(err =>
          console.log('Error appFlyer:', JSON.stringify(err)));
      }); */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      AdMob.initialize({ initializeForTesting: true });
    });
  }

  public async initialize(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }
    /**
     * Only needed if the Firebase JavaScript SDK is used.
     *
     * Read more: https://github.com/robingenz/capacitor-firebase/blob/main/packages/authentication/docs/firebase-js-sdk.md
     */
    initializeApp(firebaseConfig);
  }
}
