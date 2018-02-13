import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Vol} from "../../model/Vol";

/**
 * Generated class for the DetailVolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-vol',
  templateUrl: 'detail-vol.html',
})
export class DetailVolPage {

    private id: string;

    private vol: Vol = new Vol();

    private loader;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbProvider: DatabaseProvider, private loadingCtrl: LoadingController) {

      if(navParams.get("id")) {
          this.id = navParams.get("id");
      }

  }


  ionViewDidLoad() {
      this.presentloader();
      this.dbProvider.getVol(this.id).subscribe(
          vol => {
              this.vol = this.dbProvider.buildVolFromJson(vol);
              this.loader.dismiss();
          }
      );
  }


    presentloader() {
        this.loader = this.loadingCtrl.create({
            content: "Attendez svp..."
        });

        this.loader.present();
    }

}
