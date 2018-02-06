import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormGroup} from "@angular/forms";
import {ReserverForm} from "../../forms/ReserverForm";
import {CountriesProvider} from "../../providers/countries/countries";
import {DatabaseProvider} from "../../providers/database/database";
import {ListVolsModal} from "../../modals/listVolsModal/listVolsModal";
import {SpecificWords} from "../../config/environment";

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

    private myform: FormGroup;

    private countries;

    private searchEl = {
        countryDepart: '',
        countryArrive: ''
    };

    private words;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private countriesProvider: CountriesProvider, private dbProvider: DatabaseProvider,
              private modalCtrl: ModalController) {

      this.words = SpecificWords.myWords;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReserverPage');
  }


    ngOnInit() {
      this.myform = new ReserverForm();
        this.countriesProvider.getAllcountry().subscribe(
            (res: any) => {
                this.countries = res;
            }
        );
    }


    chercher() {
      if(this.myform.invalid)
          return;

      let modal = this.modalCtrl.create(ListVolsModal, {
          countryDepart: this.searchEl.countryDepart,
          countryArrive: this.searchEl.countryArrive
      });

      modal.present();


    }

}
