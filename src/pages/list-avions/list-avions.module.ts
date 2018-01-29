import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAvionsPage } from './list-avions';

@NgModule({
  declarations: [
    ListAvionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListAvionsPage),
  ],
})
export class ListAvionsPageModule {}
