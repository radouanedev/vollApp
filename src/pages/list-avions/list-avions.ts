import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
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

    private avions: any;
    private loader;
    private isAdmin = MyApp.isAdmin;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private dbProvider: DatabaseProvider,
              private loadingCtrl: LoadingController, private authProvider: AuthServiceProvider) {



  }

  ionViewDidLoad() {

      this.presentloader();

      //this.checkUsertype();

    console.log('ionViewDidLoad ListAvionsPage');
    this.dbProvider.getAvions().subscribe(
        avions => {
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


}
