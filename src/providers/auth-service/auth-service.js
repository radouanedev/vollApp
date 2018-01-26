var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { GooglePlus } from '@ionic-native/google-plus';
var AuthServiceProvider = (function () {
    function AuthServiceProvider(afAuth, googlePlus) {
        this.afAuth = afAuth;
        this.googlePlus = googlePlus;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.login = function (user) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    };
    AuthServiceProvider.prototype.register = function (user) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    };
    AuthServiceProvider.prototype.loginWithGoogle = function () {
        return this.googlePlus.login({ 'webClientId': '757926605458-fecoo0e322vfmdcicld1qlbim8qbhvmu.apps.googleusercontent.com', 'offline': true });
    };
    AuthServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth,
            GooglePlus])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map