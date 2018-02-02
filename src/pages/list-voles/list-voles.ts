import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddAvionModal} from "../../modals/addAvionModal/addAvionModal";
import {MyApp} from "../../app/app.component";
import {AddVolModal} from "../../modals/addVolModal/addVolModal";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListVolesPage');
  }


  gotToAddVol() {
      let volModal = this.modalCtrl.create(AddVolModal);
      volModal.present();
  }

}
