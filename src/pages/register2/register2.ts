import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../model/User";

/**
 * Generated class for the Register2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {

  @ViewChild("myform") private form: any;
  private connectError: boolean;

  private user: User= new User();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('user') as User;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register2Page');
  }

}
