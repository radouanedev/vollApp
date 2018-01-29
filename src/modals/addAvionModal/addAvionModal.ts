import {Component, OnInit} from "@angular/core";
import {NavParams, Platform, ViewController} from "ionic-angular";
import {FormGroup} from "@angular/forms";
import {Avion} from "../../model/Avion";
import {AddAvionForm} from "../../forms/AddAvionForm";

@Component({
    templateUrl: 'addAvionModal.html'
})
export class AddAvionModal implements OnInit {

    private myform: FormGroup;

    private avion: Avion = new Avion();

    constructor(
        public params: NavParams,
        public viewCtrl: ViewController ) { }


    ngOnInit() {
        this.myform = new AddAvionForm();
    }

    addAvion() {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}