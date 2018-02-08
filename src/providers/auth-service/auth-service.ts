import { Injectable } from '@angular/core';
import {User} from "../../model/User";
import {AngularFireAuth} from "angularfire2/auth";
import { GooglePlus } from '@ionic-native/google-plus';
import {Facebook} from "@ionic-native/facebook";

const clientId = '757926605458-fecoo0e322vfmdcicld1qlbim8qbhvmu.apps.googleusercontent.com';

@Injectable()
export class AuthServiceProvider {

  constructor(private afAuth: AngularFireAuth,
               private googlePlus: GooglePlus, private fb: Facebook) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginWithGoogle() {
    return this.googlePlus.login({ 'webClientId': clientId,'offline': false});
  }

  logout(){
      return this.afAuth.auth.signOut();
  }

  checkConnection() {
      return this.afAuth.authState;
  }

  checkAuthState() {
      return this.afAuth.auth;
  }

  loginWithFacebook() {
      return this.fb.login(['public_profile', 'user_friends', 'email']);
  }

  getUserData() {
      return this.fb.api("me?fields=id,email,first_name,last_name",[]);
  }

}
