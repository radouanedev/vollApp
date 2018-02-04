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

        this.vol.avion = this.avion;
        this.dbProvider.addVol(this.vol).then(
            _=> {
                this.loader.dismiss();
                this.showSuccessAlert();
                this.dismiss();
            }
        );
    }


    choose() {
        this.avionModal.present();
    }


    showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sccuée!',
            subTitle: 'Vole ajoutée avec success!',
            buttons: ['OK']
        });
        alert.present();
    }
}
