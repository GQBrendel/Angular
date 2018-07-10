import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PersistentData } from '../../providers/persistentData/persistentData';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public myPlace = {nomeDoLocal : 'Placeholder', urlImagem : 'empty'};
  public url;

  constructor(public navCtrl: NavController, public navParams: NavParams, public persistentData : PersistentData) {
  }

  ionViewDidEnter() {
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
      console.log("Carregou " + this.myPlace.nomeDoLocal);
      this.url = this.myPlace.urlImagem;
      document.getElementById('placeImage1').setAttribute('src', this.url);
    });
  }
  openRegisterPage()
  {    
    this.navCtrl.push('VisitRegisterPage');
  }
}
