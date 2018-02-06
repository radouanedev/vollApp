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


    constructor(private countriesProvider: CountriesProvider, private loadingCtrl: LoadingController,
                private alertCtrl: AlertController, private dbProvider: DatabaseProvider,
                public viewCtrl: ViewController, private modalCtrl: ModalController,
                private navCtrl: NavController, private navParams: NavParams) {

        this.avionModal = this.modalCtrl.create(ListAvionsPage, {isModal: true});

        this.avionModal.onDidDismiss(data => {
            if(data) {
                this.avion = data;
                this.avion.description = null;
                this.avion.imageURL = null;
                this.errorAvion = null;
            }
            else
                this.errorAvion = "Choisissez une avion svp";
        });
    }


    ngOnInit() {

        if(this.navParams.get('vol')) {
            this.vol = this.navParams.get('vol');
            let dateDepart = this.convertDateMilliToString(this.vol.dateDepart);
            let dateArrive = this.convertDateMilliToString(this.vol.dateArrive);

            console.log(this.vol.dateDepart);
            console.log(this.vol.dateArrive);

            this.vol.heureDepart = this.convertTimeMilliToString(this.vol.dateDepart);
            this.vol.heureArrive = this.convertTimeMilliToString(this.vol.dateArrive);

            this.vol.dateDepart = dateDepart;
            this.vol.dateArrive = dateArrive;

            this.avion = this.vol.avion;

            this.isUpdate = true;

        }

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
            content: "Attendez svp..."
        });

        this.loader.present();

        if(this.isUpdate) {

            this.vol.avion = this.avion;
            this.dbProvider.editVol(this.vol).then(
                _=> {
                    this.loader.dismiss();
                    this.showSuccessAlert('Vole modifier avec success!');
                    this.dismiss();
                }
            )

        } else {
            this.vol.avion = this.avion;
            this.dbProvider.addVol(this.vol).then(
                _=> {
                    this.loader.dismiss();
                    this.showSuccessAlert('Vole ajouter avec success!');
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
            title: 'Sccuée!',
            subTitle: message,
            buttons: ['OK']
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

        return date.getHours() + ":" + date.getMinutes();
    }
}
