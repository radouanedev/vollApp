import { NgModule } from '@angular/core';
import {MyToolBarComponent} from "./toolBarComponent";
import {MyPopOver} from "./popOver";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        MyToolBarComponent,
        MyPopOver
    ],
    imports: [
        IonicModule
    ],
    entryComponents: [
      MyPopOver
    ],
    exports: [
        MyToolBarComponent,
    ]
})
export class ToolBarModule {}
