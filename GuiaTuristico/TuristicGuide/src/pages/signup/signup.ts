import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';

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
        this.nav.setRoot(HomePage);
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
}