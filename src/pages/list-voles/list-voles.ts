import { Component } from '@angular/core';
import {
    AlertController,
    App, IonicPage, LoadingController, ModalController, NavController, NavParams,
    ViewController
} from 'ionic-angular';
import {MyApp} from "../../app/app.component";
import {AddVolModal} from "../../modals/addVolModal/addVolModal";
import {Vol} from "../../model/Vol";
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
              private dbProvider: DatabaseProvider, private viewCtrl: ViewController,
              private alertCtrl: AlertController) {

      this.volModal = this.modalCtrl.create(AddVolModal);

  }


  ionViewDidLoad() {
      this.presentloader();


      this.dbProvider.getVols(this.limit).subscribe(
          vols => {
              this.vols = [];

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


  delete(id,i) {
      let alert = this.alertCtrl.create({
          title: 'Confirm reservation',
          message: 'vous étes sure de choisir ce vol?',
          buttons: [
              {
                  text: 'Annuler',
                  role: 'cancel',
                  handler: () => {}
              },
              {
                  text: 'Ok',
                  handler: () => this.deleteVol(id,i)
              }
          ]
      });
      alert.present();
  }


  deleteVol(id,i) {
      this.dbProvider.deleteVol(id).then(
          res => {
              this.vols.splice(i,0);
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
