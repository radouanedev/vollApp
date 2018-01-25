import {Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authProvider: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  mail() {
  }


  google() {
    this.authProvider.loginWithGoogle().then(res => {
    });
  }


  facebook() {

  }


}
