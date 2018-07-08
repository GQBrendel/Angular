import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { LocationProvider } from '../../providers/location/location';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public myPerson = {};
  public nearSomePlace: boolean;

  constructor(public navCtrl: NavController, public authData: AuthProvider,  public locationData: LocationProvider,public navParams: NavParams){}

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
     personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
    this.nearSomePlace = this.locationData.isCloseToLocation;
  }

  visitPlace()
  {
      this.navCtrl.push('LocationPage');
  }


}