import {Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Register2Page} from "../register2/register2";
import {User} from "../../model/User";

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
    //console.log('ionViewDidLoad RegisterPage');
  }


  mail() {
      this.navCtrl.push(Register2Page);
  }


  google() {
    this.authProvider.loginWithGoogle().then((res)=> {
      let user = new User();
      user.nom = res.familyName;
      user.prenom = res.givenName;
      user.email = res.email;
      this.authProvider.logout();
      this.navCtrl.push(Register2Page, {user: user});
    }, (err)=> {
      alert(err);
    });
  }


  facebook() {

  }


}
