import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FormsModule } from "@angular/forms";
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(LoginPage),
      SharedModule
  ],
    exports: [
        LoginPage
    ]
})
export class LoginPageModule {}
