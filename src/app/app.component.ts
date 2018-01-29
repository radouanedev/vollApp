import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {DatabaseProvider} from "../providers/database/database";
import {ListVolesPage} from "../pages/list-voles/list-voles";
import {ListAvionsPage} from "../pages/list-avions/list-avions";
import {ReserverPage} from "../pages/reserver/reserver";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListAvionsPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private authProvider: AuthServiceProvider, private dbProvider: DatabaseProvider) {
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Voles du jour", component: HomePage, icon: "timer" },
      { title: 'Chercher vole', component: ListPage, icon: "search" },
        { title: 'Nos avions', component: ListAvionsPage, icon: "plane" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


    this.authProvider.checkAuthState().onAuthStateChanged((user: any) => {
       if(user) {
           let userId = user.uid;

           this.dbProvider.getUser(userId).subscribe((user2: any) => {
               if(user) {
                   const roles = user2._roles;
                   if(roles.admin) {
                       this.pages.push({ title: 'list voles', component: ListVolesPage, icon: "create" });
                       this.pages.push({ title: 'list avions', component: ListAvionsPage, icon: "create" });
                   } else if(roles.user) {
                       this.pages.push({ title: 'Reserver', component: ReserverPage, icon: "card" });
                   }
               }

           }, (err)=> {
           });
       }
    });

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.icon);
  }
}
