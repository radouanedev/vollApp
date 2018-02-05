import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import {firebaseConfig} from "../config/environment";
import {AngularFireModule} from "angularfire2";
import {RegisterPage} from "../pages/register/register";
import {Register2Page} from "../pages/register2/register2";
import {ShowErrors} from "../utils/ShowErrors";

import {AuthServiceProvider} from "../providers/auth-service/auth-service";

import {AngularFireAuthModule} from "angularfire2/auth";

import { GooglePlus } from '@ionic-native/google-plus';
import { CountriesProvider } from '../providers/countries/countries';
import { HttpClientModule } from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {Errors} from "../utils/Errors";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import { DatabaseProvider } from '../providers/database/database';
import {ListAvionsPage} from "../pages/list-avions/list-avions";
import {AddAvionModal} from "../modals/addAvionModal/addAvionModal";
import {ImagePicker} from "@ionic-native/image-picker";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import {AngularFireStorageModule} from "angularfire2/storage";
import {ListVolesPage} from "../pages/list-voles/list-voles";
import {AddVolModal} from "../modals/addVolModal/addVolModal";
import {ReserverPage} from "../pages/reserver/reserver";
import {MydatePipe, MytimePipe} from "../pipes/mydatePipe";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {ListVolsModal} from "../modals/listVolsModal/listVolsModal";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ShowErrors,
    RegisterPage,
    Register2Page,
    LoginPage,
      Errors,
      ListAvionsPage,
      AddAvionModal,
      ListVolesPage,
      AddVolModal,
      ReserverPage,
      MydatePipe,
      MytimePipe,
      ListVolsModal

  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(MyApp),
      ReactiveFormsModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFireStorageModule,
      AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ShowErrors,
    RegisterPage,
    Register2Page,
    LoginPage,
      ListAvionsPage,
      AddAvionModal,
      ListVolesPage,
      AddVolModal,
      ReserverPage,
      ListVolsModal
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
      File
  ]
})
export class AppModule {}
