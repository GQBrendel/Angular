import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import firebase from 'firebase';

/**
 * Generated class for the VisitRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-register',
  templateUrl: 'visit-register.html',
})
export class VisitRegisterPage {
  public myPlace = {nomeDoLocal : 'Placeholder', urlImagem : 'empty'};


  constructor(public navCtrl: NavController, public navParams: NavParams, public locationData : LocationProvider) {
  }
  ionViewDidEnter() {
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.locationData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitRegisterPage');
  }

}
