export class Avion {

    private _nom: string= ''; private _description: string= '';
    private _nbrePlcMax: number; private _urlImg: string;

    constructor() {}


    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get nbrePlcMax(): number {
        return this._nbrePlcMax;
    }

    set nbrePlcMax(value: number) {
        this._nbrePlcMax = value;
    }

    get urlImg(): string {
        return this._urlImg;
    }

    set urlImg(value: string) {
        this._urlImg = value;
    }
}