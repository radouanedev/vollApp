import { Component, ViewChild } from '@angular/core';
import {AlertController, LoadingController, Nav, Platform} from 'ionic-angular';
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
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {HttpClient} from "@angular/common/http";



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
              private loadingCtrl: LoadingController, private globalization: Globalization,
              private alertCtrl: AlertController, private push: Push, private http: HttpClient) {

      this.loader = this.loadingCtrl.create({
      });

      this.loader.present();


      this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          this.initPushNotification();
      });

      SpecificWords.myWords = words.french;

      /*this.globalization.getPreferredLanguage().then(res=>{
          if(res.value == "fr-FR") {
              SpecificWords.myWords = words.french;
          } else if(res.value == "en-US") {
              SpecificWords.myWords = words.english;
          }

          this.mywords = SpecificWords.myWords;

          this.initializeApp();
      })*/

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


    saveDeviceToken(t)
    {

        this.http.get('http://192.168.0.100/ionic/saveToken.php?token='+t)
            .subscribe(
                data => {
                    alert(JSON.stringify(data));
                },
                err => {
                    console.log("Oops!");
                }
            );

    }


    initPushNotification()
    {
        // to check if we have permission
        this.push.hasPermission()
            .then((res: any) => {

                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                } else {
                    console.log('We don\'t have permission to send push notifications');
                }

            });

        // to initialize push notifications

        const options: PushOptions = {
            android: {
                senderID: 'XXXXXXXXXXXXX'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) =>{
            console.log('Received a notification', notification);

            //Notification Display Section
            let confirmAlert = this.alertCtrl.create({
                title: 'New Notification',
                message: JSON.stringify(notification),
                buttons: [{
                    text: 'Ignore',
                    role: 'cancel'
                }, {
                    text: 'View',
                    handler: () => {
                        //TODO: Your logic here
                        //self.nav.push(DetailsPage, {message: data.message});
                    }
                }]
            });
            confirmAlert.present();
            //
        });

        pushObject.on('registration').subscribe((registration: any) => {
            console.log('Device registered', registration);
            alert(JSON.stringify(registration));
            this.saveDeviceToken( registration.registrationId);
        });

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }



}
