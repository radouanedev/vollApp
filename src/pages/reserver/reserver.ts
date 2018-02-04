import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup} from "@angular/forms";
import {ReserverForm} from "../../forms/ReserverForm";
import {CountriesProvider} from "../../providers/countries/countries";
import {DatabaseProvider} from "../../providers/database/database";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private countriesProvider: CountriesProvider, private dbProvider: DatabaseProvider) {
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


      this.dbProvider.getVolsByCountry(this.searchEl.countryDepart, this.searchEl.countryArrive)
          .subscribe(
              vols => {

                  vols.forEach((vol) => {
                      console.log(vol.payload.val());
                  });

              }
          );
    }

}
