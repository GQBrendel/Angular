import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/email';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  public formIsValid: boolean = true;
 // public userNameValue: string;
  public usernameValue:string;
  public userPreMail:string;

  constructor(public nav: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({     
      
      username: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */

  ionViewDidLoad() {
//    this.formIsValid = false;
  }
  checkIfFormIsValid()
  {
    this.formIsValid = this.signupForm.valid;

    console.log("My check if it is valid " + this.formIsValid);
 //   console.log("Tutorial check if it is valid " + this.signupForm.valid);
  }
  checkUserName()
  {
      
      //this.qty = ((<HTMLInputElement>document.getElementById("usernameInput")).value);
      
      console.log("The User Name is " + this.usernameValue);

  }
  breakMail(mail) {
    var str = mail;
    var preMail = str.replace(/\./g, "&46&");
    this.authData.preMailSingleton = preMail;
    console.log("User email is " + mail);
    console.log("User Pre Mail " + this.authData.preMailSingleton);
  }
  signupUser(){
    
    console.log("Entering in signup method");
    console.log("The value of signup.valid is " + this.signupForm.valid);
    console.log("username Input" + document.getElementById("usernameInput").innerText);
    console.log("The User Name is " + this.usernameValue);

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
      console.log("So we enter in the Unvalid IF, cause the valid is " + this.signupForm.valid);
    } else {
      console.log("So we enter in the VALID IF, cause the valid is " + this.signupForm.valid);
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.authData.loginState = true;
        this.nav.setRoot(TabsPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
  createPerson(usernameValue: string, email: string): void {
    this.breakMail(email);
    let preMail = this.authData.preMailSingleton;
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + preMail);
    personRef.set({
      usernameValue,
      email,
      preMail,
    })

    let nomeDoLocal = "Theatro São Pedro";
    let descricao = "Eh um Teatro";
    let urlImagem = "URL";
    let likes = 0;
    let locationFirebaseName = 'TheatroSaoPedro'



    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + locationFirebaseName);
    placeRef.set({
      nomeDoLocal,
      descricao,
      urlImagem,
      likes,
      locationFirebaseName
    })
  }
}