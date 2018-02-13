import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesTicketsPage } from './mes-tickets';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    MesTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(MesTicketsPage),
      SharedModule
  ],
    exports: [
        MesTicketsPage
    ]
})
export class MesTicketsPageModule {}
