import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../model/User";
import {CountriesProvider} from "../../providers/countries/countries";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { FormGroup} from "@angular/forms";
import {RegisterForm} from "../../forms/RegisterForm";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the Register2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page implements OnInit{

  private myform: FormGroup;

  private user: User= new User();

  private countries: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private countrisProvider: CountriesProvider, private loadingCtrl: LoadingController,
              private authProvider: AuthServiceProvider, private dbProvider: DatabaseProvider,
              private alertCtrl: AlertController) {

      if(navParams.get('user')) {
          this.user = navParams.get('user') as User;
      }
  }


  ngOnInit() {
      this.myform = new RegisterForm();
  }


  ionViewDidLoad() {

      this.countrisProvider.getAllcountry().subscribe(
          (res: any)=> {
              this.countries = res;
          }
      );

      console.log('ionViewDidLoad Register2Page');
  }


  register() {
      if(this.myform.valid) {

          let loader = this.loadingCtrl.create({
              content: "Attendez svp..."
          });

          loader.present();

          this.authProvider.register(this.user).then(
              (res) => {
                  this.dbProvider.addUser(res.uid, this.user);
                  console.log("register success");
                  loader.dismiss();
                  this.showSuccessAlert().then(
                      res => {
                          this.authProvider.logout();
                          this.navCtrl.setRoot('LoginPage');
                      }
                  );
              }, (err) => {
                  console.log("register failed");
                  loader.dismiss();
                  this.showErrorAlert()
              }
          );

      }
  }


    showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sccuée!',
            subTitle: 'Inscription avec succée vous pouvez vous connectez maintenant!',
            buttons: ['OK']
        });
        return alert.present();
    }


    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Failed!',
            subTitle: 'Inscription erroné (Utilisateur existe déja)',
            buttons: ['OK']
        });
        return alert.present();
    }


}
