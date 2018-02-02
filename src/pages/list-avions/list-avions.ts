import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AddAvionModal} from "../../modals/addAvionModal/addAvionModal";
import {DatabaseProvider} from "../../providers/database/database";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {MyApp} from "../../app/app.component";


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

    private avions: any;

    private loader;

    private limit = 3;

    private isModal = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private dbProvider: DatabaseProvider,
              private loadingCtrl: LoadingController, private authProvider: AuthServiceProvider,
              private viewCtrl: ViewController) {

      if(navParams.get('isModal'))
          this.isModal = true;

  }

  ionViewDidLoad() {

      this.presentloader();


    console.log('ionViewDidLoad ListAvionsPage');
    this.dbProvider.getAvions(this.limit).subscribe(
        avions => {
            this.limit++;
            this.avions = avions;
            this.loader.dismiss();
        }
    );
  }


  goToAddAvion() {
      this.presentAddAvionModal();
  }

  presentAddAvionModal() {
      let profileModal = this.modalCtrl.create(AddAvionModal);
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
                  console.log(this.limit);
                  this.avions = avions;
              }
          );

          infiniteScroll.complete();

      },700);

  }


  pickAvion(item) {
      this.viewCtrl.dismiss(item);
  }


  dismiss() {
      this.viewCtrl.dismiss();
  }


}
