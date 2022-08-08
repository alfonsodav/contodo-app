import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8ksFDmhO2Vtik2nDOrQbS2uIAPTOG-_8',
  authDomain: 'con-todo-a7dcb.firebaseapp.com',
  projectId: 'con-todo-a7dcb',
  storageBucket: 'con-todo-a7dcb.appspot.com',
  messagingSenderId: '1075847961326',
  appId: '1:1075847961326:web:e102ef60b0248f39b271ff',
  measurementId: 'G-R27MKVWXB9',
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

defineCustomElements(window);
