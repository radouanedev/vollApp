import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Vol} from "../../model/Vol";
import {Avion} from "../../model/Avion";

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

      this.presentloader();

      this.vol.avion = new Avion();

      this.id = "-L4kxR_MAHBLAFZOONA9";

      if(navParams.get("id")) {
          this.id = navParams.get("id");
      }

  }


  ionViewDidLoad() {

      this.dbProvider.getVol(this.id).subscribe((volJ:any)=>{

          this.vol = this.dbProvider.buildVolFromJsonValues(volJ, this.id);

          this.loader.dismiss();
      });

  }


    presentloader() {
        this.loader = this.loadingCtrl.create({
            content: "Attendez svp..."
        });

        this.loader.present();
    }

}
