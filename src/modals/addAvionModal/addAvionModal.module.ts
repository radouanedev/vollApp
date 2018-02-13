import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {AddAvionModal} from "./addAvionModal";
import {SharedModule} from "../../app/shared.module";

@NgModule({
    declarations: [
        AddAvionModal
    ],
    imports: [
        IonicPageModule.forChild(AddAvionModal),
        SharedModule
    ],
    exports: [
        AddAvionModal
    ]
})
export class AddAvionModalModule {}
