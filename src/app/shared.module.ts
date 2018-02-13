import {NgModule} from "@angular/core";
import {ToolBarModule} from "../toolBarComponent/toolBar.module";
import {ErrorModule} from "../utils/error.module";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
    imports: [
        ToolBarModule,
        ErrorModule,
        PipesModule,
    ],
    exports: [
        ToolBarModule,
        ErrorModule,
        PipesModule,
    ]
})

export class SharedModule {}