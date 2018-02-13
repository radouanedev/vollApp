import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReserverPage } from './reserver';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    ReserverPage,
  ],
  imports: [
    IonicPageModule.forChild(ReserverPage),
      SharedModule
  ],
    exports: [
        ReserverPage
    ]
})
export class ReserverPageModule {}
