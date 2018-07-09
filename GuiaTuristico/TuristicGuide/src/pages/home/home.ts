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
  public myPlace = { urlImagem : ''};
  public nearSomePlace: boolean;
  public messageToUser: string;
  public imageHidder: number;

  constructor(public navCtrl: NavController, public authData: AuthProvider,  public locationData: LocationProvider,public navParams: NavParams){}

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
     personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
  }

  ionViewDidEnter() {
    this.checkIfNearLocation();
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.locationData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
    
      document.getElementById('placeImage').setAttribute('src', this.myPlace.urlImagem);
    });
  }
  checkIfNearLocation()
  {
    this.nearSomePlace = this.locationData.isCloseToLocation;
    if(this.nearSomePlace)
    {
      this.messageToUser = "Pertinho de " + this.locationData.closeLocationName;
      document.getElementById('placeImage').style.display = "inline";
    }
    else
    {
      this.imageHidder = 0;
      this.messageToUser = "Você não está próximo a nenhuma localidade, visite o mapa para encontrar um ponto turístico próximo à você."
      document.getElementById('placeImage').style.display = "none";
    }
  }

  visitPlace()
  {
      this.navCtrl.push('LocationPage');
  }


}