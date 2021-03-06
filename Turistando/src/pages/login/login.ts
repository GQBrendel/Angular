import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../app/Models/User";
import { RegisterPage } from "../register/register";
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,

    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user : User)
  {
    try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      //console.log(result);
      if(result)
      {
        this.navCtrl.setRoot(TabsPage);
      }
    }
    catch(e){
      console.log(e);
    }
  }
  register()
  {
    console.log("Register button clicked");
    this.navCtrl.push(RegisterPage);
  }

}
