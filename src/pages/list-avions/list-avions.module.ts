import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAvionsPage } from './list-avions';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    ListAvionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListAvionsPage),
      SharedModule
  ],
    exports: [
        ListAvionsPage
    ]
})
export class ListAvionsPageModule {}
