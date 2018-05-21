import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Profile } from '../../app/Models/profile';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  profileData: Observable<Profile>

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController) {

  }
  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 2000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();

      }
      else {
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000
        }).present();
      }
     });
  }
}
