import {Component, OnInit} from "@angular/core";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {App, ViewController} from "ionic-angular";
import {MyApp} from "../app/app.component";

@Component({
    templateUrl: 'popOver.html'
})

export class MyPopOver implements OnInit{

    private isConnected = MyApp.connected;

    constructor(private authProvider: AuthServiceProvider,private appCtrl: App,
                private viewCtrl: ViewController) {
    }

    ngOnInit() {
    }


    deconnecter() {
        this.authProvider.logout();
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot('LoginPage');
    }


    goToConnect() {
        this.viewCtrl.dismiss();
        this.appCtrl.getRootNav().setRoot('LoginPage');
    }


}