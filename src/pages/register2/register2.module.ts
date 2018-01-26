import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Register2Page } from './register2';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    Register2Page
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(Register2Page),
  ],
})
export class Register2PageModule {}
