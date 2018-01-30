import {Component, OnInit} from "@angular/core";
import {NavParams, Platform, ToastController, ViewController} from "ionic-angular";
import {FormGroup} from "@angular/forms";
import {Avion} from "../../model/Avion";
import {AddAvionForm} from "../../forms/AddAvionForm";
import {ImagePicker} from "@ionic-native/image-picker";
import * as firebase from 'firebase';

@Component({
    templateUrl: 'addAvionModal.html',
    styles: ['.content{background: #e6e6e6}']
})
export class AddAvionModal implements OnInit {

    private myform: FormGroup;

    private avion: Avion = new Avion();

    private imageUrl:string;
    private imageError:string;


    constructor(
        public params: NavParams,private toastCtrl: ToastController,
        public viewCtrl: ViewController, private imagePicker: ImagePicker ) { }


    ngOnInit() {
        this.myform = new AddAvionForm();
    }


    addAvion() {

    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


    upload() {
        let options = {
            maximumImagesCount: 1
        }

        this.imagePicker.getPictures(options).then((res) => {

            if(this.imageUrl) {
                this.imageUrl = res;
                return;
            }

            if(res =='') {
                this.imageError = "Image est requise";
                this.showToast("Canceled");
            } else {
                this.imageUrl = res;
                this.imageError = null;
            }


        }, (err) => { this.showToast("failed"); });
    }


    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });

        toast.present(toast);
    }

}