import {Component, OnInit} from "@angular/core";
import {Vol} from "../../model/Vol";
import {
    AlertController, LoadingController, ModalController, NavController, NavParams,
    ViewController
} from "ionic-angular";
import {DatabaseProvider} from "../../providers/database/database";
import {Ticket} from "../../model/Ticket";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {User} from "../../model/User";
import {NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR} from "@angular/core/src/view/provider";

@Component({
    templateUrl : 'listVolsModal.html',
    styles: ['.card-header { color: #00BCD4}']
})
export class ListVolsModal implements OnInit {

    private vols:Vol[] = [];

    private loader;

    private countryDepart = '';
    private countryArrive = '';


    constructor(private navCtrl: NavController, private navParams: NavParams,
                public viewCtrl: ViewController, private modalCtrl: ModalController,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                private dbProvider: DatabaseProvider, private authProvider: AuthServiceProvider) {


        this.countryDepart = this.navParams.get('countryDepart');
        this.countryArrive = this.navParams.get('countryArrive');
    }


    ngOnInit(){

        this.presentloader();

        this.dbProvider.getVolsByCountry(this.countryDepart, this.countryArrive)
            .subscribe(
                vols => {
                    this.vols = [];
                    vols.forEach((vol) => {
                        let _vol = this.dbProvider.buildVolFromJson(vol);
                        this.vols.push(_vol);

                    });
                    this.loader.dismiss();
                }
            );
    }

    pickVol(vol) {
        let alert = this.alertCtrl.create({
            title: 'Confirm reservation',
            message: 'vous étes sure de choisir ce vol?',
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
    }


    addTicket(vol) {

        this.presentloader();

        let ticket = new Ticket();

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

                    //this.dbProvider.updateVolAfterReserve(vol.id);

                    this.loader.dismiss();

                    this.showSuccessAlert();

                    this.viewCtrl.dismiss();
                });
            });
        });

    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


    presentloader() {
        this.loader = this.loadingCtrl.create({
            content: "Attendez svp..."
        });

        this.loader.present();
    }


    showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sccuée!',
            subTitle: 'Ticket reservé avec success!',
            buttons: ['OK']
        });
        alert.present();
    }

}