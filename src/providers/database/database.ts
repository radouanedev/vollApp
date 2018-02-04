import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../../model/User";
import {Avion} from "../../model/Avion";
import {Vol} from "../../model/Vol";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase) {
    console.log('Hello DatabaseProvider Provider');
  }


  addUser(userId: string, user: User) {
      user.password = null;
      user.email = null;
      const usersRef = this.db.list("users");
      return usersRef.set(userId, user);
  }


  getUser(userId) {
     return this.db.object('users/'+userId).valueChanges();
  }


  addAvion(avion: Avion) {
      const avionsRef = this.db.list("avions");
      return avionsRef.push(avion);
  }


  getAvions(limitFirst) {
      return this.db.list("avions", ref=> ref.limitToFirst(limitFirst) )
          .snapshotChanges();
  }


  addVol(vol: Vol) {
      const volsRef = this.db.list("vols");

      vol.id = null;

      let datetimeDepart = vol.dateDepart + " " + vol.heureDepart;
      let datetimeArrive = vol.dateArrive + " " + vol.heureArrive;

      vol.heureDepart = null;
      vol.heureArrive = null;

      let datetimeDepartMilli = Date.parse(datetimeDepart);
      let datetimeArriveMilli = Date.parse(datetimeArrive);

      vol.dateDepart = datetimeDepartMilli + "";
      vol.dateArrive = datetimeArriveMilli + "";

      vol.cD_cA = vol.countryDepart + "_" + vol.countryArrive;

      return volsRef.push(vol);
  }


  getVols(limitFirst) {
      return this.db.list("vols", ref=> ref.limitToFirst(limitFirst) )
          .snapshotChanges();
  }


  getVolsByCountry(countryD, countryA) {
      let concact = countryD + "_" + countryA;
      return this.db.list("vols", ref=>
          ref.orderByChild('_cD_cA').equalTo(concact))
          .snapshotChanges();
  }


  buildAvionFromJson(avionJ): Avion{
      let avion = new Avion();
      avion.id = avionJ.key;
      avion.nom = avionJ.payload.val()._nom;
      avion.description = avionJ.payload.val()._description;
      avion.nbrePlcMax = avionJ.payload.val()._nbrePlcMax;
      avion.imageURL = avionJ.payload.val().imageURL;
      return avion;
  }


  buildVolFromJson(volJ): Vol{
      let vol = new Vol();
      vol.id = volJ.key;
      vol.countryDepart = volJ.payload.val()._countryDepart;
      vol.countryArrive = volJ.payload.val()._countryArrive;
      vol.dateDepart = volJ.payload.val()._dateDepart;
      vol.dateArrive = volJ.payload.val()._dateDepart;
      vol.heureDepart = volJ.payload.val()._heureDepart;
      vol.heureArrive = volJ.payload.val()._heureArrive;
      vol.prix = volJ.payload.val()._prix;
      vol.nbrePlace = volJ.payload.val()._nbrePlace;

      let avionJ = volJ.payload.val()._avion;
      let avion = new Avion();
      avion.id = avionJ._id;
      avion.nom = avionJ._nom;
      avion.nbrePlcMax = avionJ._nbrePlcMax;

      vol.avion = avion;

      return vol;
  }




}

