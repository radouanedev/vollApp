import { Component, ViewChild } from '@angular/core';
import {AlertController, LoadingController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {DatabaseProvider} from "../providers/database/database";
import { Globalization } from '@ionic-native/globalization';
import {SpecificWords} from "../config/environment";
import {words} from "../translate/words";
import {MesTicketsPage} from "../pages/mes-tickets/mes-tickets";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FCM, NotificationData} from "@ionic-native/fcm";




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'DetailVolPage';

  pages: Array<{title: string, component: any, icon: any}>;

  public static isAdmin = false;
  public static connected = false;

  private loader;

  private mywords;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private authProvider: AuthServiceProvider, private dbProvider: DatabaseProvider,
              private loadingCtrl: LoadingController, private globalization: Globalization,
              private alertCtrl: AlertController, private push: Push, private http: HttpClient,
              private fcm: FCM) {

      this.loader = this.loadingCtrl.create({
      });

      this.loader.present();


      this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          //this.initPushNotification();
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
                  this.pages.push({ title: this.mywords.list_flights_string, component: 'ListVolesPage', icon: "create" });
                  MyApp.isAdmin = true;
              } else if(roles.user) {
                  this.pages.push({ title: this.mywords.reserve_string, component: 'ReserverPage', icon: "card" });
                  this.pages.push({ title: this.mywords.my_tickets_string, component: 'MesTicketsPage', icon: "card" });
              }
              MyApp.connected = true;
          }
      }
      this.loader.dismiss();
  }


  initPages() {
      this.pages = [
          { title: this.mywords.today_flights_string, component: 'ListPage', icon: "timer" },
          { title: this.mywords.search_flight_string, component: 'ReserverPage', icon: "search" },
          { title: this.mywords.our_airplanes_string, component: 'ListAvionsPage', icon: "plane" }
      ];
  }


    saveDeviceToken(t)
    {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json');

        //const params = new HttpParams().set('token',t);

        this.http.post('https://jsonplaceholder.typicode.com/posts', {title:"first user",token:t})
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
        /*this.push.hasPermission()
            .then((res: any) => {

                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                } else {
                    console.log('We don\'t have permission to send push notifications');
                }

            }, err => {
                alert("err 1");
            });*/


        this.fcm.onNotification().subscribe((data: NotificationData)=>{
            if(data.wasTapped){
                this.nav.push('ReserverPage');
                console.log("Received in background");
            } else {

                let confirmAlert = this.alertCtrl.create({
                    title: 'New Notification',
                    message: "hahahahah",
                    buttons: [{
                        text: 'Ignore',
                        role: 'cancel'
                    }, {
                        text: 'View',
                        handler: () => {
                            this.nav.push('ReserverPage');
                            //self.nav.push(DetailsPage, {message: data.message});
                        }
                    }]
                });
                confirmAlert.present();
                console.log("Received in foreground");
            };
        })

        // to initialize push notifications

        /*const options: PushOptions = {
            android: {
                senderID: '889502691124'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe(    (notification: any) =>{
            console.log('Received a notification', notification);

            if(notification.wasTapped) {
                this.nav.push('ReserverPage');
                return;
            }

            //Notification Display Section
            let confirmAlert = this.alertCtrl.create({
                title: 'New Notification',
                message: notification.message,
                buttons: [{
                    text: 'Ignore',
                    role: 'cancel'
                }, {
                    text: 'View',
                    handler: () => {
                        //TODO: Your logic here
                        this.nav.push('ReserverPage');
                        //self.nav.push(DetailsPage, {message: data.message});
                    }
                }]
            });
            confirmAlert.present();
            //
        });

        pushObject.on('registration').subscribe((registration: any) => {
            //console.log('Device registered', registration);
            //alert(registration.registrationId);
            //this.nav.push('LoginPage', {id: registration.registrationId})
            this.saveDeviceToken(registration.registrationId);
        }, err => {
            alert(err);
        });

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));*/
    }



}
