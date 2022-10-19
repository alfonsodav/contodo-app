import { CapacitorConfig } from '@capacitor/cli';
/// <reference types="@capacitor/firebase-authentication" />

const config: CapacitorConfig = {
  appId: 'io.spicyrocket.contodo',
  appName: 'contodo-app',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['facebook.com', 'google.com'],
    },
  },
};

export default config;
