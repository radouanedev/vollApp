import {Component, OnInit} from "@angular/core";
import {AlertController, LoadingController, NavParams, Platform, ToastController, ViewController} from "ionic-angular";
import {FormGroup} from "@angular/forms";
import {Avion} from "../../model/Avion";
import {AddAvionForm} from "../../forms/AddAvionForm";
import {ImagePicker} from "@ionic-native/image-picker";
import {AngularFireStorage} from "angularfire2/storage";
import {FilePath} from "@ionic-native/file-path";
import {FileChooser} from "@ionic-native/file-chooser";
import { File} from "@ionic-native/file";
import {DatabaseProvider} from "../../providers/database/database";
import {FileUtils} from "../../utils/FileUtils";
import {SpecificWords} from "../../config/environment";


@Component({
    templateUrl: 'addAvionModal.html',
})
export class AddAvionModal implements OnInit {

    private fileUtils: FileUtils;
    private myform: FormGroup;

    private avion: Avion = new Avion();

    private imageURL;
    private imageError;
    private loader;

    private words = SpecificWords.myWords;

    constructor(
        public params: NavParams,private toastCtrl: ToastController,
        public viewCtrl: ViewController, private imagePicker: ImagePicker,
        private fileChooser: FileChooser,
        private filePath: FilePath, private file: File, private storage: AngularFireStorage,
        private dbProvider: DatabaseProvider, private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {

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

                if(uri == '') {
                    this.imageError = "Image est requise";
                    this.showToast("Canceled");
                    return;
                }

                this.imageURL = uri;
                this.imageError = null;

                this.fileUtils.readAsDataURL(this.imageURL).then(fileUrl => {

                    if(!this.validImage(fileUrl)) {
                        this.imageURL = null;
                        this.imageError = "Image est invalid";
                        return;
                    }

                    this.imageURL = fileUrl;
                });
            }
        );

    }


    addAvion() {

        if(!this.imageURL)
            return;

        //let blob = new Blob()

        this.loader = this.loadingCtrl.create({
            content: this.words.wait_plz_string
        });

        this.loader.present();

        this.dbProvider.addAvion(this.avion).then(
            _=> {
                this.loader.dismiss();
                this.showSuccessAlert();
                this.dismiss();
            }
        );

        /*this.fileUtils.readAsDataURL(this.imageURL)
            .then(dataUrl => this.upload(dataUrl))
            .then(
                snapshot => {
                    this.loader.dismiss();
                    alert("yeeees");
                }, err => {
                    this.loader.dismiss();
                    alert("nooooo");
                }
            );*/

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


    showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: this.words.success_string,
            subTitle: this.words.succee_add_airplane_string,
            buttons: [this.words.okey_string]
        });
        alert.present();
    }


    validImage(fileUrl): boolean {

        let extension = fileUrl.substring(fileUrl.length-3,fileUrl.length);

        if(extension == "jpg" || extension == "png")
            return true

        return false;
    }

}