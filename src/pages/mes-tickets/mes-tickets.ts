import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the MesTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mes-tickets',
  templateUrl: 'mes-tickets.html',
})
export class MesTicketsPage {

    private tickets: any[] = [];

    private loader;

    private limit = 3;

    private idUser;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl: LoadingController, private dbProvider: DatabaseProvider,
              private authProvider: AuthServiceProvider) {
  }


  ionViewDidLoad() {

      this.presentloader();

      this.authProvider.checkConnection().subscribe(user => {
         this.idUser = user.uid;
          this.dbProvider.getMyTickets(this.idUser,this.limit).subscribe(
              (tickets: any) => {
                  this.tickets = tickets;
                  this.loader.dismiss();
                  this.limit++;
              }
          );
      });


  }


    doInfinite(infiniteScroll) {

        setTimeout(()=> {
            this.dbProvider.getMyTickets(this.idUser,this.limit).subscribe(
                (tickets: any) => {
                    this.tickets = tickets;
                    this.loader.dismiss();
                    this.limit++;
                }
            );
            infiniteScroll.complete();

        },700);

    }



    presentloader() {
        this.loader = this.loadingCtrl.create({
            content: "Attendez svp..."
        });

        this.loader.present();
    }


}
