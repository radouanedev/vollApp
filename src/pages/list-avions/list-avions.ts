import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {MyApp} from "../../app/app.component";
import {Avion} from "../../model/Avion";


/**
 * Generated class for the ListAvionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-avions',
  templateUrl: 'list-avions.html',
})
export class ListAvionsPage {

    private isAdmin = MyApp.isAdmin;

    private avions: Avion[] = [];

    private loader;

    private limit = 3;

    private isModal = false;

    private indexOfAvions = 0;

    private ind = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private dbProvider: DatabaseProvider,
              private loadingCtrl: LoadingController, private viewCtrl: ViewController) {

      if(navParams.get('isModal'))
          this.isModal = true;



  }

  ionViewDidLoad() {

      this.presentloader();

      this.avions = [];
      this.dbProvider.getAvions(this.limit).subscribe(
          avions => {

              this.limit++;

              avions.forEach((avion, index) => {
                  let _avion = this.dbProvider.buildAvionFromJson(avion);
                  this.avions.push(_avion);
                  this.indexOfAvions=index;

              });

              console.log(this.indexOfAvions);

              this.loader.dismiss();
          }
      );
  }


  goToAddAvion() {
      this.presentAddAvionModal();
  }

  presentAddAvionModal() {
      let profileModal = this.modalCtrl.create('AddAvionModal');
      profileModal.present();
  }


  presentloader() {
      this.loader = this.loadingCtrl.create({
          content: "Attendez svp..."
      });

      this.loader.present();
  }


  doInfinite(infiniteScroll) {

      setTimeout(()=> {

          this.dbProvider.getAvions(this.limit).subscribe(
              avions => {
                  this.limit++;

                  avions.forEach((avion, index) => {
                      if(index > this.indexOfAvions) {
                          let _avion = this.dbProvider.buildAvionFromJson(avion);
                          this.avions.push(_avion);
                          this.indexOfAvions++;
                      }

                  })

                  console.log(this.indexOfAvions);
              }
          );

          infiniteScroll.complete();

      },700);

  }


  pickAvion(avion: Avion, i) {

      if(!this.isModal || !this.isAdmin)
          return;

      if(this.ind > -1)
          return;

      this.ind = i;

      setTimeout(()=> {
          this.viewCtrl.dismiss(avion);
      }, 800);
  }


  dismiss() {
      this.viewCtrl.dismiss();
  }


}
