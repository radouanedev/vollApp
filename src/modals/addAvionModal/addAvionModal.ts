import {Component, OnInit} from "@angular/core";
import {LoadingController, NavParams, Platform, ToastController, ViewController} from "ionic-angular";
import {FormGroup} from "@angular/forms";
import {Avion} from "../../model/Avion";
import {AddAvionForm} from "../../forms/AddAvionForm";
import {ImagePicker} from "@ionic-native/image-picker";
import {AngularFireStorage, AngularFireStorageReference} from "angularfire2/storage";
import {FilePath} from "@ionic-native/file-path";
import {FileChooser} from "@ionic-native/file-chooser";
import {Entry, File} from "@ionic-native/file";
import * as path from "path";
import {DatabaseProvider} from "../../providers/database/database";
import {FileUtils} from "../../utils/FileUtils";
import * as firebase from "firebase/app";

@Component({
    templateUrl: 'addAvionModal.html',
    styles: ['.content{background: #e6e6e6}']
})
export class AddAvionModal implements OnInit {

    private fileUtils: FileUtils;
    private myform: FormGroup;

    private avion: Avion = new Avion();

    private imageURL;
    private imageError;
    private loader;

    constructor(
        public params: NavParams,private toastCtrl: ToastController,
        public viewCtrl: ViewController, private imagePicker: ImagePicker,
        private fileChooser: FileChooser,
        private filePath: FilePath, private file: File, private storage: AngularFireStorage,
        private dbProvider: DatabaseProvider, private loadingCtrl: LoadingController) {

        this.fileUtils = new FileUtils(this.file, this.filePath);
    }


    ngOnInit() {
        this.myform = new AddAvionForm();
    }


    addAction() {

        if(this.myform.invalid)
            return;

        this.addAvion();
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


    choose() {

        this.fileChooser.open().then(
            uri => {

                if(this.imageURL) {
                    this.imageURL = uri;
                    return;
                }

                if(uri =='') {
                    this.imageError = "Image est requise";
                    this.showToast("Canceled");
                } else {
                    this.imageURL = uri;
                    this.imageError = null;
                }
            }
        );

    }


    addAvion() {

        if(!this.imageURL)
            return;

        let blob = new Blob()

        this.loader = this.loadingCtrl.create({
            content: "Attendez svp..."
        });

        this.loader.present();

        this.fileUtils.readAsDataURL(this.imageURL)
            .then(dataUrl => this.upload(dataUrl))
            .then(
                snapshot => {
                    this.dbProvider.addAvion(this.avion);
                    this.loader.dismiss();
                    alert("yeeees");
                }, err => {
                    this.loader.dismiss();
                    alert("nooooo");
                }
            );

    }




    upload(dataUrl) {
        return fetch(dataUrl).then(res => {
            return this.storage.upload("images/anyname.jpeg" , res.blob());
        })
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