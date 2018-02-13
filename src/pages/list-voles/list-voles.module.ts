import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListVolesPage } from './list-voles';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    ListVolesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListVolesPage),
      SharedModule
  ],
    exports: [
        ListVolesPage
    ]
})
export class ListVolesPageModule {}
