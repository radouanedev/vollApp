import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddAvionModal} from "../../modals/addAvionModal/addAvionModal";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAvionsPage');
  }


  goToAddAvion() {
      this.presentAddAvionModal();
  }

  presentAddAvionModal() {
      let profileModal = this.modalCtrl.create(AddAvionModal);
      profileModal.present();
  }

}
