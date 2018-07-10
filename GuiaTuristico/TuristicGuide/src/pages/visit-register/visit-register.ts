import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersistentData } from '../../providers/persistentData/persistentData';
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
  public visitorReport : string;
  public visitorScore : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public persistentData : PersistentData) {
  }
  ionViewDidEnter() {
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
    });
    console.log("Olha só que chegou eh o: " + this.persistentData.usernameValue);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitRegisterPage');
  }
  endRegister(visitorReport: string, visitorScore: number): void {
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName + '/' + this.persistentData.userIdentifier);
    placeRef.update({
      visitorReport,
      visitorScore
    })    
  }

}
