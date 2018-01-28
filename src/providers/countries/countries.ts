import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CountriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountriesProvider {

    private url;

    constructor(public http: HttpClient) {
        this.url = "http://restcountries.eu/rest/v2/all";
    }

    getAllcountry() {
        return this.http.get(this.url);
    }

}
