import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AddAvionModal} from "../../modals/addAvionModal/addAvionModal";
import {MyApp} from "../../app/app.component";
import {AddVolModal} from "../../modals/addVolModal/addVolModal";
import {Vol} from "../../model/Vol";
import {Avion} from "../../model/Avion";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the ListVolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-voles',
  templateUrl: 'list-voles.html',
})
export class ListVolesPage {

    private isAdmin = MyApp.isAdmin;

    private vols: Vol[] = [];

    private loader;

    private limit = 3;

    private isModal = false;

    private indexOfVols = 0;

    private volModal;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private loadingCtrl: LoadingController,
              private dbProvider: DatabaseProvider, private viewCtrl: ViewController) {

      this.volModal = this.modalCtrl.create(AddVolModal);

      this.volModal.onDidDismiss(_=> {
          this.navCtrl.setRoot(ListVolesPage);
      });
  }


  ionViewDidLoad() {
      this.presentloader();

      this.vols = [];
      this.dbProvider.getVols(this.limit).subscribe(
          vols => {

              this.limit++;

              vols.forEach((vol, index) => {
                  let _vol = this.dbProvider.buildVolFromJson(vol);
                  this.vols.push(_vol);
                  this.indexOfVols=index;

              });

              console.log(this.indexOfVols);

              this.loader.dismiss();
          }
      );
  }


    doInfinite(infiniteScroll) {

        setTimeout(()=> {

            this.dbProvider.getVols(this.limit).subscribe(
                vols => {
                    this.limit++;

                    vols.forEach((vol, index) => {
                        if(index > this.indexOfVols) {
                            let _vol = this.dbProvider.buildVolFromJson(vol);
                            this.vols.push(_vol);
                            this.indexOfVols++;
                        }

                    })

                    console.log(this.indexOfVols);
                }
            );

            infiniteScroll.complete();

        },700);

    }


  gotToAddVol() {
      this.volModal.present();
  }


  edit(vol) {
      this.volModal = this.modalCtrl.create(AddVolModal, {vol: vol});
      this.volModal.present();
  }


  delete(id) {

  }


    presentloader() {
        this.loader = this.loadingCtrl.create({
            content: "Attendez svp..."
        });

        this.loader.present();
    }



}
