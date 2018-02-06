import {Component} from "@angular/core";
import {PopoverController} from "ionic-angular";
import {MyPopOver} from "./popOver";

@Component({
    selector: 'mytoolbar',
    templateUrl: 'toolBarComponent.html'
})

export class MyToolBarComponent {

    constructor(private popoverCtrl: PopoverController) {

    }


    presentPopOver(ev) {
        let popover = this.popoverCtrl.create(MyPopOver);
        popover.present({
            ev: ev
        });
    }

}