import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {DatabaseProvider} from "../../providers/database/database";
import {SpecificWords} from "../../config/environment";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private words = SpecificWords.myWords;

    constructor(public navCtrl: NavController, private authProvider: AuthServiceProvider,
                private dbProvider: DatabaseProvider) {
    }


    ionViewDidLoad() {
        this.authProvider.checkConnection().subscribe(user => {
            if(!user)
                this.navCtrl.setRoot('LoginPage');
        })
    }


    logout() {
        this.authProvider.logout();
    }


}
