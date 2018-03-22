import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../../model/User";
import {Avion} from "../../model/Avion";
import {Vol} from "../../model/Vol";
import {Ticket} from "../../model/Ticket";
import {AuthServiceProvider} from "../auth-service/auth-service";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase, private authProvider: AuthServiceProvider) {
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


  getVol(id){
      return this.db.object("vols/"+id).valueChanges();
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

      let _vol = new Vol();

      _vol.countryDepart = vol.countryDepart;
      _vol.countryArrive = vol.countryArrive;

      //_vol.id = null;

      let datetimeDepart = vol.dateDepart + " " + vol.heureDepart;
      let datetimeArrive = vol.dateArrive + " " + vol.heureArrive;

      /*_vol.heureDepart = null;
      _vol.heureArrive = null;*/

      let datetimeDepartMilli = Date.parse(datetimeDepart);
      let datetimeArriveMilli = Date.parse(datetimeArrive);

      _vol.dateDepart = datetimeDepartMilli + "";
      _vol.dateArrive = datetimeArriveMilli + "";

      _vol.prix = vol.prix;
      _vol.nbrePlace = vol.nbrePlace;
      _vol.avion = vol.avion;
      _vol.cD_cA = vol.cD_cA;

      return volRef.update(_vol);

  }


  deleteVol(id) {
      const volRef = this.db.object('vols/'+id);
      return volRef.remove();
  }


  updateVolAfterReserve(id, nbrePlace) {
      const volRef = this.db.object('vols/'+id);
      const newNbrePlaces = nbrePlace-1;
      return volRef.update({_nbrePlace: newNbrePlaces});
  }


  getVols(limitFirst) {
      return this.db.list("vols", ref=> ref.limitToFirst(limitFirst) )
          .snapshotChanges();
  }


  getTodayVols(limitToFirst) {

      let currentDate = new Date();
      let currentDateMillis = Date.parse(currentDate.toString()) - (1000*60);

      console.log(currentDateMillis);

      return this.db.list("vols", ref=> ref.orderByChild("_dateDepart")
          .startAt(currentDateMillis, "_dateDepart")
          .limitToFirst(limitToFirst))
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
      vol.cD_cA = volJ.payload.val()._cD_cA;

      let avionJ = volJ.payload.val()._avion;
      let avion = new Avion();
      avion.id = avionJ._id;
      avion.nom = avionJ._nom;
      avion.nbrePlcMax = avionJ._nbrePlcMax;

      vol.avion = avion;

      return vol;
  }


  buildVolFromJsonValues(volJ, id): Vol {

      const _vol = new Vol();
      _vol.id = id;
      _vol.countryDepart = volJ._countryDepart;
      _vol.countryArrive = volJ._countryArrive;
      _vol.dateDepart = volJ._dateDepart;
      _vol.dateArrive = volJ._dateArrive;
      _vol.prix = volJ._prix;
      _vol.nbrePlace = volJ._nbrePlace;
      _vol.cD_cA = volJ._cD_cA;

      let avionJ = volJ._avion;
      let _avion = new Avion();
      _avion.id = avionJ._id;
      _avion.nbrePlcMax = avionJ._nbrePlcMax;
      _avion.nom = avionJ._nom;
      _avion.imageURL = avionJ.imageURL;

      _vol.avion = _avion;

      return _vol;

  }


  addTicket(vol: Vol, user: any, userId) {
      const ticketsRef = this.db.list("tickets");

      let ticket = new Ticket();

      let _vol = new Vol();

      _vol.dateDepart = vol.dateDepart;
      _vol.dateArrive = vol.dateArrive;
      _vol.countryDepart = vol.countryDepart;
      _vol.countryArrive = vol.countryArrive;
      _vol.prix = vol.prix;
      _vol.nbrePlace = vol.nbrePlace;
      _vol.id = vol.id;

      ticket.vol = _vol;

      let _user = new User();
      _user.cin = user._cin;
      _user.nom = user._nom;
      _user.prenom = user._prenom;
      _user.id = userId;

      ticket.user = _user;

      return ticketsRef.push(ticket).then(()=> {
          return this.updateVolAfterReserve(vol.id, _vol.nbrePlace);
      });

  }


  getMyTickets(userId,limitFirst) {
      return this.db.list("tickets", ref=> ref.orderByChild("_user/_id")
          .equalTo(userId).limitToFirst(limitFirst))
          .valueChanges();
  }



}

