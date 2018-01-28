import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private authProvider: AuthServiceProvider) {
    }


    ionViewDidLoad() {
        this.authProvider.checkConnection().subscribe(user => {
            if(!user)
                this.navCtrl.setRoot(LoginPage);
        })
    }


}
