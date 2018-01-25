import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";
import {User} from "../../model/User";
import {RegisterPage} from "../register/register";



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("myform") private form: any;
  private connectError: boolean;

  private user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authProvider: AuthServiceProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionView di load');
  }


  login() {
    if(this.form.valid) {

      let loader = this.loadingCtrl.create({
        content: "Attendez svp..."
      });

      loader.present();

      this.authProvider.login(this.user).then(
        (res) => {
          console.log("login success");
          this.navCtrl.setRoot(HomePage);
          loader.dismiss();
        }, (err) => {
          console.log("login error");
          this.connectError = true;
          loader.dismiss();
        }
      );
    }

  }

  gotoRegisterPag() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
