import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { RegisterPage } from './register';
import {ToolBarModule} from "../../toolBarComponent/toolBar.module";
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
      IonicPageModule.forChild(RegisterPage),
      SharedModule
  ],
    exports: [
        RegisterPage
    ]
})
export class RegisterPageModule {}
