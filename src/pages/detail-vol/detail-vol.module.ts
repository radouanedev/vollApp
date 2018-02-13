import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailVolPage } from './detail-vol';

@NgModule({
  declarations: [
    DetailVolPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailVolPage),
  ],
    exports: [
        DetailVolPage
    ]
})
export class DetailVolPageModule {}
