import {Time} from "@angular/common";
import {Avion} from "./Avion";

export class Vol {

    private _countryDepart: string= ''; private _countryArrive: string= '';
    private _dateDepart: string= ''; private _heureDepart: string = '';
    private _dateArrive: string= ''; private _heureArrive: string ='';
    private _prix: number; private _avion: Avion = new Avion();


    get countryDepart(): string {
        return this._countryDepart;
    }

    set countryDepart(value: string) {
        this._countryDepart = value;
    }

    get countryArrive(): string {
        return this._countryArrive;
    }

    set countryArrive(value: string) {
        this._countryArrive = value;
    }

    get dateDepart(): string {
        return this._dateDepart;
    }

    set dateDepart(value: string) {
        this._dateDepart = value;
    }

    get heureDepart(): string {
        return this._heureDepart;
    }

    set heureDepart(value: string) {
        this._heureDepart = value;
    }

    get dateArrive(): string {
        return this._dateArrive;
    }

    set dateArrive(value: string) {
        this._dateArrive = value;
    }

    get heureArrive(): string {
        return this._heureArrive;
    }

    set heureArrive(value: string) {
        this._heureArrive = value;
    }

    get prix(): number {
        return this._prix;
    }

    set prix(value: number) {
        this._prix = value;
    }

    get avion(): Avion {
        return this._avion;
    }

    set avion(value: Avion) {
        this._avion = value;
    }
}