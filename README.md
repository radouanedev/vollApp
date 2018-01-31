# vollApp
vollApp
https://www.toptal.com/angular-js/angular-4-forms-validation




/***************************  I need this ************************////


import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {ImagePicker} from "@ionic-native/image-picker";
import * as firebase from 'firebase';
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import { Entry,File} from "@ionic-native/file";
import * as path from "path";
import {AngularFireStorage} from "angularfire2/storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   private imageURI;
   private realImage;

  constructor(public navCtrl: NavController,private imagePicker: ImagePicker,
              private toastCtrl: ToastController, private fileChooser: FileChooser,
              private filePath: FilePath, private file: File, private storage: AngularFireStorage) {
  }


  pickImage() {
    // trigger file chooser
    this.fileChooser
      .open()
      .then(uri => this.filePath.resolveNativePath(uri))
      .then(filePath => this.handlePreviewAndResolveFileUrl(filePath))
      .then(file => this.handleFileUpload(file))
      .catch(error => {
        console.log(error);
      });
  }


  handlePreviewAndResolveFileUrl(filePath) {

    this.imageURI = filePath;

    return this.file.resolveLocalFilesystemUrl(filePath);
  }

  handleFileUpload(file: Entry) {
    const dirname = path.dirname(file.nativeURL);
    const filename = file.name;


    return this.file
      .readAsDataURL(dirname, filename)
      .then(dataUrl => {
        // upload to firebase
        return this.storage.upload("images/" + filename, dataUrl);
      })
      .then(snapshot => {
        alert("yeaaaah");
      }, err => {
        alert("fuuuuuuuuuuuck");
      });
  }


  /*pickImage() {

    let options = {
      maximumImagesCount: 1,
    }

    this.fileChooser.open().then(uri => {
      this.filePath.resolveNativePath(uri).then(realUri=> {
        this.imageURI = realUri;
      });
    });

  }


  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 10000,
      position: 'middle'
    });

    toast.present(toast);
  }


  uploadImage() {

    if(!this.imageURI)
      return;

    alert(this.imageURI);

    let path:string = this.imageURI.toString();

    let n = path.lastIndexOf("/");
    let x = path.lastIndexOf("g");
    let nameFile = path.substring(n+1, x+1);
    let directory = path.substring(0, n);

    this.file.readAsArrayBuffer(directory.toString(), nameFile).then(res => {

      alert(res);
      let blob = new Blob([res],  {type: "image/jpeg"});
      let uploadTask = this.storage.upload("images/" + nameFile, blob);
      uploadTask.then(res2=> {
        this.showToast("image uploaded");
      }, error=> {
        alert(error);
      });

    });



  }*/



}

