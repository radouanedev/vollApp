import { NgModule } from '@angular/core';
import {IonicModule} from "ionic-angular";
import {ShowErrors} from "./ShowErrors";
import {Errors} from "./Errors";

@NgModule({
    declarations: [
        ShowErrors,
        Errors
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ShowErrors,
        Errors
    ]
})
export class ErrorModule {}
