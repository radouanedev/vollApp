import {Component, OnInit} from "@angular/core";
import {CountriesProvider} from "../../providers/countries/countries";
import {FormGroup} from "@angular/forms";
import {Vol} from "../../model/Vol";
import {
    AlertController, LoadingController, ModalController, NavController, NavParams,
    ViewController
} from "ionic-angular";
import {DatabaseProvider} from "../../providers/database/database";
import {AddVolForm} from "../../forms/AddVolForm";
import {AddAvionModal} from "../addAvionModal/addAvionModal";
import {ListAvionsPage} from "../../pages/list-avions/list-avions";
import {SpecificWords} from "../../config/environment";


@Component({
    templateUrl: 'addVolModal.html',
})
export class AddVolModal implements OnInit {

    private countries;

    private myform: FormGroup;

    private vol: Vol = new Vol();

    private CountryError;

    private avion;

    private avionModal;

    private errorAvion;

    private loader;

    private isUpdate=false;

    private recentVol = new Vol();

    private words = SpecificWords.myWords;

    constructor(private countriesProvider: CountriesProvider, private loadingCtrl: LoadingController,
                private alertCtrl: AlertController, private dbProvider: DatabaseProvider,
                public viewCtrl: ViewController, private modalCtrl: ModalController,
                private navCtrl: NavController, private navParams: NavParams) {

        this.avionModal = this.modalCtrl.create(ListAvionsPage, {isModal: true});

    }


    ngOnInit() {

        if(this.navParams.get('vol')) {

            this.recentVol = this.navParams.get('vol');

            this.vol.id = this.recentVol.id;
            this.vol.countryDepart = this.recentVol.countryDepart;
            this.vol.countryArrive = this.recentVol.countryArrive;
            this.vol.prix = this.recentVol.prix;
            this.vol.avion = this.recentVol.avion;
            this.vol.cD_cA = this.recentVol.cD_cA;
            this.vol.nbrePlace = this.recentVol.nbrePlace;

            let dateDepart = this.convertDateMilliToString(this.recentVol.dateDepart);
            let dateArrive = this.convertDateMilliToString(this.recentVol.dateArrive);

            let heureDepart = this.convertTimeMilliToString(this.recentVol.dateDepart);
            let heureArrive = this.convertTimeMilliToString(this.recentVol.dateArrive);

            console.log(heureDepart);
            console.log(heureArrive);

            this.vol.dateDepart = dateDepart;
            this.vol.dateArrive = dateArrive;

            this.vol.heureDepart = heureDepart;
            this.vol.heureArrive = heureArrive;

            this.avion = this.vol.avion;

            this.isUpdate = true;

        }

        this.avionModal.onDidDismiss(data => {

                if(data) {
                    this.avion = data;
                    this.avion.description = null;
                    this.avion.imageURL = null;
                    this.errorAvion = null;
                    console.log(this.avion.nom);
                    this.vol.avion = this.avion;
                }
                else
                    this.errorAvion = "Choisissez une avion svp";
        });

        this.myform = new AddVolForm();
        this.countriesProvider.getAllcountry().subscribe(
            (res: any) => {
                this.countries = res;
            }
        );
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


    addAction() {

        if (this.myform.invalid || !this.avion)
            return;

        this.loader = this.loadingCtrl.create({
            content: this.words.wait_plz_string
        });

        this.loader.present();

        if(this.isUpdate) {

            this.dbProvider.editVol(this.vol).then(
                _=> {
                    this.recentVol = this.vol;
                    this.loader.dismiss();
                    this.showSuccessAlert(this.words.succee_edit_airplane_string);
                    this.dismiss();
                }
            )

        } else {
            this.dbProvider.addVol(this.vol).then(
                _=> {
                    this.loader.dismiss();
                    this.showSuccessAlert(this.words.succee_add_airplane_string);
                    this.dismiss();
                }
            );
        }


    }


    choose() {
        this.avionModal.present();
    }


    showSuccessAlert(message) {
        let alert = this.alertCtrl.create({
            title: this.words.success_string,
            subTitle: message,
            buttons: [this.words.okey_string]
        });
        alert.present();
    }


    convertDateMilliToString(millisecond): string {

        let dateMilli = parseInt(millisecond);
        let date = new Date(dateMilli);

        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();

        let monthString = month + "";
        let dayString = day + "";

        if(month < 10)
            monthString = "0" + month;
        if(day < 10)
            dayString = "0" + day;

        return year + '-' + monthString + '-' + dayString;
    }


    convertTimeMilliToString(millisecond): string {

        let dateMilli = parseInt(millisecond);
        let date = new Date(dateMilli);

        let hours = date.getHours();
        let minutes = date.getMinutes();

        let hoursString = hours + "";
        let minutesString = minutes + "";

        if(hours < 10)
            hoursString = "0" + hours;
        if(minutes < 10)
            minutesString = "0" + minutes

        return hoursString + ":" + minutesString;
    }
}
