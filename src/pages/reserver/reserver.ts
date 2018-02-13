import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CountriesProvider} from "../../providers/countries/countries";
import {DatabaseProvider} from "../../providers/database/database";
import {SpecificWords} from "../../config/environment";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the ReserverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserver',
  templateUrl: 'reserver.html',
})
export class ReserverPage implements OnInit {

    @ViewChild("myform") private myform: any;

    private isConnected = MyApp.connected;

    private countries;

    private searchEl = {
        countryDepart: '',
        countryArrive: ''
    };

    private words = SpecificWords.myWords;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private countriesProvider: CountriesProvider, private dbProvider: DatabaseProvider,
              private modalCtrl: ModalController) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReserverPage');
  }


    ngOnInit() {
        this.countriesProvider.getAllcountry().subscribe(
            (res: any) => {
                this.countries = res;
            }
        );
    }


    chercher() {
      if(this.myform.invalid)
          return;

      let modal = this.modalCtrl.create('ListVolsModal', {
          countryDepart: this.searchEl.countryDepart,
          countryArrive: this.searchEl.countryArrive
      });

      modal.present();


    }

}
