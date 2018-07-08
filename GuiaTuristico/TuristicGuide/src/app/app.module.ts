import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { Camera } from '@ionic-native/camera';

// Importing AF2 Module

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { Geolocation } from '@ionic-native/geolocation';
// AF2 Settings
const firebaseConfig = {
  // apiKey: 'AIzaSyALKfevapBOYK202f6k5mPPfMrT1MHDv5A',
  // authDomain: 'bill-tracker-e5746.firebaseapp.com',
  // databaseURL: 'https://bill-tracker-e5746.firebaseio.com',
  // storageBucket: 'bill-tracker-e5746.appspot.com',
  // messagingSenderId: '508248799540',
  apiKey: "AIzaSyDFAmoZT0QQKA69ED4UiX0ligCQhwkTaDE",
  authDomain: "app-turistando.firebaseapp.com",
  databaseURL: "https://app-turistando.firebaseio.com",
  projectId: "app-turistando",
  storageBucket: "app-turistando.appspot.com",
  messagingSenderId: "202240578335"
};
@NgModule(
  {
    declarations: [ MyApp, /*HomePage,*/ LoginPage, TabsPage ],
    imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      MyApp,
      // HomePage,
      LoginPage,
      TabsPage
    ],
    providers: [
      StatusBar,
      SplashScreen,
      Geolocation,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthProvider,
      Camera
    ]
})
export class AppModule {}
