import { Injectable } from '@angular/core';
import {User} from "../../model/User";
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class AuthServiceProvider {


  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
}
