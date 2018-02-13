import { NgModule } from '@angular/core';
import {MydatePipe, MytimePipe} from "./mydatePipe";


@NgModule({
    declarations: [
        MydatePipe,
        MytimePipe
    ],
    exports:[
        MydatePipe,
        MytimePipe
    ]
})
export class PipesModule {}
