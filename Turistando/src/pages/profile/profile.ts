import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../app/models/profile'
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home'

import { TabsPage } from '../tabs/tabs'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  public tab : TabsPage;
  private app: App


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  createProfile()
  {
   
    
    this.afAuth.authState.take(1).subscribe(auth =>{
        this.afDatabase.list(`profile/${auth.uid}`).push(this.profile)
        .then(() => this.navCtrl.setRoot(HomePage));
    })
  }

}
