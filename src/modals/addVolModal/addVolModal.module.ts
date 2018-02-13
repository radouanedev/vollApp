import { NgModule } from '@angular/core';
import {AddVolModal} from "./addVolModal";
import {IonicPageModule} from "ionic-angular";
import {SharedModule} from "../../app/shared.module";

@NgModule({
    declarations: [
        AddVolModal
    ],
    imports: [
        IonicPageModule.forChild(AddVolModal),
        SharedModule
    ],
    exports: [
        AddVolModal
    ]
})
export class AddVolModalModule {}
