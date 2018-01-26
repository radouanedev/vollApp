var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { HomePage } from "../home/home";
import { User } from "../../model/User";
import { RegisterPage } from "../register/register";
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, authProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        this.user = new User();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionView di load');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.form.valid) {
            var loader_1 = this.loadingCtrl.create({
                content: "Attendez svp..."
            });
            loader_1.present();
            this.authProvider.login(this.user).then(function (res) {
                console.log("login success");
                _this.navCtrl.setRoot(HomePage);
                loader_1.dismiss();
            }, function (err) {
                console.log("login error");
                _this.connectError = true;
                loader_1.dismiss();
            });
        }
    };
    LoginPage.prototype.gotoRegisterPag = function () {
        this.navCtrl.setRoot(RegisterPage);
    };
    __decorate([
        ViewChild("myform"),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "form", void 0);
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AuthServiceProvider, LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map