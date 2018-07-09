import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocationProvider } from '../../providers/location/location';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public myPlace = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationData : LocationProvider) {
  }

  ionViewDidLoad() {
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.locationData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
    });
  }

}
