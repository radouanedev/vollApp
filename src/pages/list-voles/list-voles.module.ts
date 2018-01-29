import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListVolesPage } from './list-voles';

@NgModule({
  declarations: [
    ListVolesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListVolesPage),
  ],
})
export class ListVolesPageModule {}
