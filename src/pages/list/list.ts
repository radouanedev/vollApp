import { Component } from '@angular/core';
import {AlertController, App, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {MyApp} from "../../app/app.component";
import {Vol} from "../../model/Vol";
import {DatabaseProvider} from "../../providers/database/database";
import {LoginPage} from "../login/login";
import {Ticket} from "../../model/Ticket";
import {User} from "../../model/User";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

    private isConnected = MyApp.connected;
    private isAdmin = MyApp.isAdmin;

    private vols:Vol[] = [];

    private loader;

    private limit = 3;

    private indexOfVols = 0;

    private ind = -1;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                private dbProvider: DatabaseProvider,private authProvider: AuthServiceProvider,
                private appNav: App, public viewCtrl: ViewController) {

    }


    ionViewDidLoad() {
        this.presentloader();


        this.dbProvider.getVols(this.limit).subscribe(
            vols => {
                this.vols = [];

                this.limit++;

                vols.forEach((vol, index) => {
                    let _vol = this.dbProvider.buildVolFromJson(vol);
                    this.vols.push(_vol);
                    this.indexOfVols=index;

                });

                console.log(this.indexOfVols);

                this.loader.dismiss();
            }
        );
    }


    doInfinite(infiniteScroll) {

        setTimeout(()=> {

            this.dbProvider.getVols(this.limit).subscribe(
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

        if(this.isAdmin)
            return;

        if(!this.isConnected) {
            setTimeout(()=> {
                this.navCtrl.setRoot(LoginPage, {reserver: true});
            }, 800);
            return;
        }

        if(this.ind > 0)
            return;

        this.ind = i;

        setTimeout(() => {
            let alert = this.alertCtrl.create({
                title: 'Confirm reservation',
                message: 'vous étes sure de reserver ce vol?',
                buttons: [
                    {
                        text: 'Annuler',
                        role: 'cancel',
                        handler: () => {}
                    },
                    {
                        text: 'Ok',
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

        /*let ticket = new Ticket();

        let _vol = new Vol();

        _vol.dateDepart = vol.dateDepart;
        _vol.dateArrive = vol.dateArrive;
        _vol.countryDepart = vol.countryDepart;
        _vol.countryArrive = vol.countryArrive;
        _vol.prix = vol.prix;
        _vol.nbrePlace = vol.nbrePlace;
        _vol.id = vol.id;

        ticket.vol = _vol;

        this.authProvider.checkConnection().subscribe(user => {

            let userId = user.uid;

            this.dbProvider.getUser(userId).subscribe((user2: any)=> {

                let _user = new User();
                _user.cin = user2._cin;
                _user.nom = user2._nom;
                _user.prenom = user2._prenom;
                _user.id = userId;

                ticket.user = _user;

                this.dbProvider.addTicket(ticket).then(res => {

                    this.dbProvider.updateVolAfterReserve(vol.id, _vol.nbrePlace).then(res2 => {

                        this.showSuccessAlert();

                        this.viewCtrl.dismiss();

                    });

                });
            });
        });*/

    }

    showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sccuée!',
            subTitle: 'Ticket reservé avec success!',
            buttons: ['OK']
        });
        alert.present();
    }


    presentloader() {
        this.loader = this.loadingCtrl.create({
            content: "Attendez svp..."
        });

        this.loader.present();
    }


}
