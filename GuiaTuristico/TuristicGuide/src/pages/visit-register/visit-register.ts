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
  public myPlace = {totalVisits: 0, nomeDoLocal : 'Placeholder', urlImagem : 'empty'};
  public visitorReport : string;
  public visitorScore : number;
  public totalVisits : number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public persistentData : PersistentData) {
  }
  ionViewDidEnter() {
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
      this.totalVisits = this.myPlace.totalVisits;
      this.persistentData.totalVisits = this.totalVisits;

      console.log("Total Visits: " + this.persistentData.totalVisits);
    });
    console.log("Olha só que chegou eh o: " + this.persistentData.usernameValue);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitRegisterPage');
  }
  endRegister(visitorReport: string, visitorScore: number): void {
    let visitorImgURL : string = 'http://www.monalisadepijamas.com.br/wp-content/uploads/2011/08/BareMarW.jpg';
    let visitorName = this.persistentData.usernameValue;
    let visitorAvatarUrl = this.persistentData.userAvatarURL;
    this.totalVisits += 1;
    let totalVisits = this.totalVisits;
    let likes = 0;
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName + '/Visitor' + this.totalVisits);
    placeRef.update({
      visitorName,
      visitorReport,
      visitorScore,
      visitorImgURL,
      visitorAvatarUrl,
      likes
    })

    const placeRefUpdateVisits: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName);
    placeRefUpdateVisits.update({
      totalVisits
    })
    }
}
