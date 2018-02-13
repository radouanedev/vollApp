import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import {ListPage} from "./list";

@NgModule({
    declarations: [
        ListPage
    ],
    imports: [
        IonicPageModule.forChild(ListPage),
        SharedModule
    ],
    exports: [
        ListPage
    ]
})
export class ListPageModule {}
