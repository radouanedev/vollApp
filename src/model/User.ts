export class User {

  private _email: string=''; private _password: string='';
  private _nom: string=''; private _prenom: string='';
  private _dateNaiss: Date = new Date(); private _cin: string;
  private _tel: string = ''; private _nationnalite: string = ''

  constructor() {
  }


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get dateNaiss(): Date {
    return this._dateNaiss;
  }

  set dateNaiss(value: Date) {
    this._dateNaiss = value;
  }

  get cin(): string {
    return this._cin;
  }

  set cin(value: string) {
    this._cin = value;
  }

  get tel(): string {
    return this._tel;
  }

  set tel(value: string) {
    this._tel = value;
  }

  get nationnalite(): string {
    return this._nationnalite;
  }

  set nationnalite(value: string) {
    this._nationnalite = value;
  }


}
