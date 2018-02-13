import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {ListVolsModal} from "./listVolsModal";
import {SharedModule} from "../../app/shared.module";

@NgModule({
    declarations: [
        ListVolsModal
    ],
    imports: [
        IonicPageModule.forChild(ListVolsModal),
        SharedModule
    ],
    exports: [
        ListVolsModal
    ]
})
export class ListVolsModalModule {}
