import {Component, OnInit} from "@angular/core";
import {Vol} from "../../model/Vol";
import {
    AlertController, App, IonicPage, LoadingController, ModalController, NavController, NavParams,
    ViewController
} from "ionic-angular";
import {DatabaseProvider} from "../../providers/database/database";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

import {SpecificWords} from "../../config/environment";
import {MyApp} from "../../app/app.component";

@IonicPage()
@Component({
    templateUrl : 'listVolsModal.html',
    styles: ['.card-header { color: #00BCD4}']
})
export class ListVolsModal implements OnInit {

    private isConnected = MyApp.connected;
    private isAdmin = MyApp.isAdmin;

    private vols:Vol[] = [];

    private loader;

    private limit = 3;

    private indexOfVols = 0;

    private countryDepart = '';
    private countryArrive = '';

    private ind = -1;

    private selected = false;

    private words = SpecificWords.myWords;

    constructor(private navCtrl: NavController, private navParams: NavParams,
                public viewCtrl: ViewController, private modalCtrl: ModalController,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                private dbProvider: DatabaseProvider, private authProvider: AuthServiceProvider,
                private appNav: App) {


        this.countryDepart = this.navParams.get('countryDepart');
        this.countryArrive = this.navParams.get('countryArrive');
    }


    ngOnInit(){

        this.presentloader();

        this.dbProvider.getVolsByCountry(this.countryDepart, this.countryArrive)
            .subscribe(
                vols => {
                    this.vols = [];
                    this.limit++;
                    vols.forEach((vol,index) => {
                        let _vol = this.dbProvider.buildVolFromJson(vol);
                        this.vols.push(_vol);
                        this.indexOfVols=index;
                    });
                    this.loader.dismiss();
                }
            );
    }


    doInfinite(infiniteScroll) {

        setTimeout(()=> {

            this.dbProvider.getVolsByCountry(this.countryDepart, this.countryArrive).subscribe(
                vols => {
                    this.limit++;
                    vols.forEach((vol, index) => {
                        if(index > this.indexOfVols) {
                            let _vol = this.dbProvider.buildVolFromJson(vol);
                            this.vols.push(_vol);
                            this.indexOfVols++;
                        }

                    })

                    console.log(this.indexOfVols);
                }
            );

            infiniteScroll.complete();

        },700);

    }


    pickVol(vol,i) {

        if(this.selected)
            return;

        this.selected = true;

        this.ind = i;

        if(this.isAdmin)
            return;

        if(!this.isConnected) {
            setTimeout(()=> {
                this.viewCtrl.dismiss();
                this.appNav.getRootNav().setRoot('LoginPage', {reserver: true});
            });
            return;
        }


        setTimeout(() => {
            let alert = this.alertCtrl.create({
                title: this.words.confirm_reservation_title_string,
                message: this.words.confirm_reservation_message_string,
                buttons: [
                    {
                        text: this.words.cancel_string,
                        role: 'cancel',
                        handler: () => {this.selected = false;}
                    },
                    {
                        text: this.words.okey_string,
                        handler: () => this.addTicket(vol)
                    }
                ]
            });
            alert.present();
        }, 800);

    }


    addTicket(vol) {

        this.presentloader();


        this.authProvider.checkConnection().subscribe(user => {

            let userId = user.uid;

            this.dbProvider.getUser(userId).subscribe((user2: any)=> {
                this.dbProvider.addTicket(vol, user2, userId).then(
                    res => {
                        this.showSuccessAlert();

                        this.viewCtrl.dismiss();
                    }
                );
            });

        });

    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


    presentloader() {
        this.loader = this.loadingCtrl.create({
            content: this.words.wait_plz_string
        });

        this.loader.present();
    }


    showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: this.words.success_string,
            subTitle: this.words.success_reserve_ticket_string,
            buttons: [this.words.okey_string]
        });
        alert.present();
    }

}