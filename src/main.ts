import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCS1TNBYP76BC-T5YUL4brRgscqRV4twsM',
  authDomain: 'con-todo-a7dcb.firebaseapp.com',
  projectId: 'con-todo-a7dcb',
  storageBucket: 'con-todo-a7dcb.appspot.com',
  messagingSenderId: '1075847961326',
  appId: '1:1075847961326:android:205bf1d4de708c6ab271ff'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

defineCustomElements(window);
