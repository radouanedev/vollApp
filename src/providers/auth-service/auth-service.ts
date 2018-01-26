import { Injectable } from '@angular/core';
import {User} from "../../model/User";
import {AngularFireAuth} from "angularfire2/auth";
import { GooglePlus } from '@ionic-native/google-plus';

const clientId = '757926605458-fecoo0e322vfmdcicld1qlbim8qbhvmu.apps.googleusercontent.com';

@Injectable()
export class AuthServiceProvider {

  constructor(private afAuth: AngularFireAuth,
               private googlePlus: GooglePlus) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginWithGoogle() {
    return this.googlePlus.login({ 'webClientId': clientId,'offline': true});
  }
}
