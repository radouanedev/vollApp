import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../../model/User";
import {Avion} from "../../model/Avion";
import {Vol} from "../../model/Vol";
import {Ticket} from "../../model/Ticket";

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
      user.roles = {
        user: true
      };
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

      vol.nbrePlace = vol.avion.nbrePlcMax;

      return volsRef.push(vol);
  }

  editVol(vol: Vol) {
      const volRef = this.db.object('vols/'+vol.id);

      let _vol = vol;

      //_vol.id = null;

      let datetimeDepart = _vol.dateDepart + " " + _vol.heureDepart;
      let datetimeArrive = _vol.dateArrive + " " + _vol.heureArrive;

      _vol.heureDepart = null;
      _vol.heureArrive = null;

      let datetimeDepartMilli = Date.parse(datetimeDepart);
      let datetimeArriveMilli = Date.parse(datetimeArrive);

      _vol.dateDepart = datetimeDepartMilli + "";
      _vol.dateArrive = datetimeArriveMilli + "";

      return volRef.update(_vol);

  }


  deleteVol(id) {
      const volRef = this.db.object('vols/'+id);
      return volRef.remove();
  }


  updateVolAfterReserve(id, nbrePlace) {
      const volRef = this.db.object('vols/'+id);
      console.log("hahahaha : " + nbrePlace);
      const newNbrePlaces = nbrePlace-1;
      return volRef.update({_nbrePlace: newNbrePlaces});
  }


  getVols(limitFirst) {
      return this.db.list("vols", ref=> ref.limitToFirst(limitFirst) )
          .snapshotChanges();
  }


  getVolsByCountry(countryD, countryA) {
      let concact = countryD + "_" + countryA;

      let currentDate = new Date();
      let currentDateMillis = Date.parse(currentDate.toString());

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
      vol.dateArrive = volJ.payload.val()._dateArrive;
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


  addTicket(ticket: Ticket) {
      const ticketsRef = this.db.list("tickets");
      return ticketsRef.push(ticket);
  }


}

