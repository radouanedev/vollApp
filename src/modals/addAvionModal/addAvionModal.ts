import {Component, OnInit} from "@angular/core";
import {NavParams, Platform, ToastController, ViewController} from "ionic-angular";
import {FormGroup} from "@angular/forms";
import {Avion} from "../../model/Avion";
import {AddAvionForm} from "../../forms/AddAvionForm";
import {ImagePicker} from "@ionic-native/image-picker";
import * as firebase from 'firebase';
import {firebaseConfig} from "../../config/environment";

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
        public viewCtrl: ViewController, private imagePicker: ImagePicker ) {
        firebase.initializeApp(firebaseConfig);
    }


    ngOnInit() {
        this.myform = new AddAvionForm();
    }


    addAvion() {

        if(!this.imageUrl)
            return;

        let image = this.dataURItoBlob('data:image/jpeg;base64,' + this.imageUrl);

        let uploadTask = firebase.storage().ref().child('image/uploaded.png').put(image);

        uploadTask.then(res=> {
            this.showToast("image uploaded");
        }, err => {
            this.showToast("image no uploaded");
        });
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


    dataURItoBlob(dataURI) {
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    };

}