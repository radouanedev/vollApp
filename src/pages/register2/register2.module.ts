import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Register2Page } from './register2';
import { FormsModule } from "@angular/forms";
import {ToolBarModule} from "../../toolBarComponent/toolBar.module";
import {ShowErrors} from "../../utils/ShowErrors";
import {ErrorModule} from "../../utils/error.module";
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    Register2Page,

  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(Register2Page),
      SharedModule
  ],
    exports:[
        Register2Page,
    ]
})
export class Register2PageModule {}
