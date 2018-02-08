import { Component, ViewChild } from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {DatabaseProvider} from "../providers/database/database";
import {ListVolesPage} from "../pages/list-voles/list-voles";
import {ListAvionsPage} from "../pages/list-avions/list-avions";
import {ReserverPage} from "../pages/reserver/reserver";
import { Globalization } from '@ionic-native/globalization';
import {SpecificWords} from "../config/environment";
import {words} from "../translate/words";
import {MesTicketsPage} from "../pages/mes-tickets/mes-tickets";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: any}>;

  public static isAdmin = false;
  public static connected = false;

  private loader;

  private mywords;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private authProvider: AuthServiceProvider, private dbProvider: DatabaseProvider,
              private loadingCtrl: LoadingController, private globalization: Globalization) {

      this.loader = this.loadingCtrl.create({
      });

      this.loader.present();


      this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
      });

      SpecificWords.myWords = words.french;

      this.globalization.getPreferredLanguage().then(res=>{
          if(res.value == "fr-FR") {
              SpecificWords.myWords = words.french;
          } else if(res.value == "en-US") {
              SpecificWords.myWords = words.english;
          }

          this.mywords = SpecificWords.myWords;

          this.initializeApp();
      })

      this.mywords = SpecificWords.myWords;

      this.initializeApp();

  }


  initializeApp() {

    this.authProvider.checkAuthState().onAuthStateChanged((user: any) => {

        this.initPages()

        if(user) {
            let userId = user.uid;
            this.dbProvider.getUser(userId).subscribe((realUser: any) => this.getUser(realUser));
        } else {
            if(MyApp.connected) {
                this.initPages();
                MyApp.connected = false;
                MyApp.isAdmin = false;
            }
           this.loader.dismiss();
        }
    });

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.icon);
  }


  getUser(user) {
      if(user) {
          if(!MyApp.connected) {
              const roles = user._roles;
              if(roles.admin) {
                  this.pages.push({ title: this.mywords.list_flights_string, component: ListVolesPage, icon: "create" });
                  MyApp.isAdmin = true;
              } else if(roles.user) {
                  this.pages.push({ title: this.mywords.reserve_string, component: ReserverPage, icon: "card" });
                  this.pages.push({ title: this.mywords.my_tickets_string, component: MesTicketsPage, icon: "card" });
              }
              MyApp.connected = true;
          }
      }
      this.loader.dismiss();
  }


  initPages() {
      this.pages = [
          { title: this.mywords.today_flights_string, component: ListPage, icon: "timer" },
          { title: this.mywords.search_flight_string, component: ReserverPage, icon: "search" },
          { title: this.mywords.our_airplanes_string, component: ListAvionsPage, icon: "plane" }
      ];
  }


}
