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

  public placeName: string;

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

    this.placeName = this.persistentData.locationFirebaseName;
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
    if(totalVisits > 2) //Se for maior que 02 coloca os atributos do 03
    {
      const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName + '/Visitor3');
      placeRef.on('value', personSnapshot => {
        this.myPlace = personSnapshot.val();
        
        document.getElementById('visitor3').setAttribute('style', "display: inline-block;");      
        document.getElementById('visitor3Avatar').setAttribute('src', this.myPlace.visitorAvatarUrl);
        
        this.visitor3_Name = this.myPlace.visitorName;
        
        this.url = this.myPlace.visitorImgURL;
        document.getElementById('placeImage3').setAttribute('src', this.url);

        this.visitor3_Likes = this.myPlace.likes;

        this.visitor3_Report = this.myPlace.visitorReport;
      });
    }
    if(totalVisits > 1) //coloca os atributos do 02
    {
      const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName + '/Visitor2');
      placeRef.on('value', personSnapshot => {
        this.myPlace = personSnapshot.val();
        
        document.getElementById('visitor2').setAttribute('style', "display: inline-block;");      
        document.getElementById('visitor2Avatar').setAttribute('src', this.myPlace.visitorAvatarUrl);
        
        this.visitor2_Name = this.myPlace.visitorName;
        
        this.url = this.myPlace.visitorImgURL;
        document.getElementById('placeImage2').setAttribute('src', this.url);

        this.visitor2_Likes = this.myPlace.likes;

        this.visitor2_Report = this.myPlace.visitorReport;
      });
    }
    if(totalVisits > 0) //Coloca os atricutos do 01
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
