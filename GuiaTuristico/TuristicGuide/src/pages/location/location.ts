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

  public myPlace = {totalVisits: 0, nomeDoLocal : 'Placeholder', urlImagem : 'empty'};
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
      this.persistentData.totalVisits = this.myPlace.totalVisits;
    });

    this.loadPreviousVisits();
  }
  openRegisterPage()
  {    
    this.navCtrl.push('VisitRegisterPage');
  }
  loadPreviousVisits()
  {
    let totalVisits = this.persistentData.totalVisits;

    if(totalVisits == 0)
    {
      return;
    }
    else if(totalVisits == 1)
    {
      document.getElementById('visitor1').setAttribute('style', "display: inline-block;");



    }

  }
}
