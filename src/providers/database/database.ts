import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../../model/User";
import {Avion} from "../../model/Avion";

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


  getAvions() {
      return this.db.list("avions").valueChanges();
  }

}

