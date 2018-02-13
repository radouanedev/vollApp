import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {firebaseConfig} from "../config/environment";
import {AngularFireModule} from "angularfire2";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";

import {AngularFireAuthModule} from "angularfire2/auth";

import { GooglePlus } from '@ionic-native/google-plus';
import { CountriesProvider } from '../providers/countries/countries';
import { HttpClientModule } from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import { DatabaseProvider } from '../providers/database/database';
import {ImagePicker} from "@ionic-native/image-picker";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import {AngularFireStorageModule} from "angularfire2/storage";
import {AngularFirestoreModule} from "angularfire2/firestore";
import { Globalization } from '@ionic-native/globalization';
import { NativeStorage } from '@ionic-native/native-storage';
import {Facebook} from "@ionic-native/facebook";
import {Push} from "@ionic-native/push";
import {SharedModule} from "./shared.module";


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
      IonicModule.forRoot(MyApp),
      ReactiveFormsModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFireStorageModule,
      AngularFirestoreModule,
      HttpClientModule,
      SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
      StatusBar,
      SplashScreen,
      AuthServiceProvider,
      GooglePlus,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      CountriesProvider,
      AngularFireDatabase,
      DatabaseProvider,
      ImagePicker,
      FileChooser,
      FilePath,
      File,
      Globalization,
      NativeStorage,
      Facebook,
      Push

  ]
})
export class AppModule {}
