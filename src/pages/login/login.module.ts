import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FormsModule } from "@angular/forms";
import {ShowErrors} from "../../utils/ShowErrors";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@NgModule({
  declarations: [
    LoginPage,
    ShowErrors
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(LoginPage),
    AngularFireAuthModule
  ],
  providers: [
    AuthServiceProvider
  ]
})
export class LoginPageModule {}
