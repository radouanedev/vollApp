import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
      IonicPageModule.forChild(RegisterPage),
      AngularFireAuthModule
  ],
    providers: [
        AuthServiceProvider
    ]
})
export class RegisterPageModule {}
