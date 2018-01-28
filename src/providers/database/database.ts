import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../../model/User";

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
      const listRef = this.db.list("users");
      return listRef.set(userId, user);
  }
}
