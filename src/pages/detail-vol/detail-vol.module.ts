import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailVolPage } from './detail-vol';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    DetailVolPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailVolPage),
      SharedModule
  ],
    exports: [
        DetailVolPage
    ]
})
export class DetailVolPageModule {}
