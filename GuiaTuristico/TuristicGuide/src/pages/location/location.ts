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

  public myPlace = {likes: 0, visitorReport: '', visitorImgURL: '', visitorName: '', visitorAvatarUrl: '', totalVisits: 0, nomeDoLocal : 'Placeholder', urlImagem : 'empty'};
  public url;

  public visitor1_Name: string;
  public visitor2_Name: string;
  public visitor3_Name: string;

  public visitor1_Report: string;
  public visitor2_Report: string;
  public visitor3_Report: string;

  
  public visitor1_Likes: number;
  public visitor2_Likes: number;
  public visitor3_Likes: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public persistentData : PersistentData) {
  }

  ionViewDidEnter() {
    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
      console.log("Carregou " + this.myPlace.nomeDoLocal);
      
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
      const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName + '/Visitor1');
      placeRef.on('value', personSnapshot => {
        this.myPlace = personSnapshot.val();
        
        document.getElementById('visitor1').setAttribute('style', "display: inline-block;");      
        document.getElementById('visitor1Avatar').setAttribute('src', this.myPlace.visitorAvatarUrl);
        
        this.visitor1_Name = this.myPlace.visitorName;
        
        this.url = this.myPlace.visitorImgURL;
        document.getElementById('placeImage1').setAttribute('src', this.url);

        this.visitor1_Likes = this.myPlace.likes;

        this.visitor1_Report = this.myPlace.visitorReport;
      });
    



    }

  }
}
