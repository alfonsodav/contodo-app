import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.spicyrocket.contodo',
  appName: 'contodo',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CapacitorFirebaseAuth: {
      providers: ['google.com', 'facebook.com'],
      languageCode: 'es',
      nativeAuth: false,
      properties: {
        google: {
            hostedDomain: 'my-custom-domain.com'
        }
      },
      permissions: {
           google: ['profile', 'https://www.googleapis.com/auth/drive']
       }
      }
    }
};

export default config;

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChePws-rmdK1fIX8okjWQGVI-uzhwhdkc",
  authDomain: "contodo-test-3adad.firebaseapp.com",
  projectId: "contodo-test-3adad",
  storageBucket: "contodo-test-3adad.appspot.com",
  messagingSenderId: "868615568679",
  appId: "1:868615568679:web:a8e9a9e399f40610a6bd02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

appflyer :: HURM4Gq9PC8Y9mSgt3jisY
 */
