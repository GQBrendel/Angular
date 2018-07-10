import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersistentData } from '../../providers/persistentData/persistentData';
import firebase from 'firebase';
import {storage } from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';

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
  public urlObj = { a: 0, g: false, h: false, i: ''};
  public visitorReport : string;
  public visitorScore : number;
  public totalVisits : number;
  public visitorImgURL : any = 'https://st.motortrend.com/uploads/sites/5/2015/11/noimage.png?interpolation=lanczos-none&fit=around|660:440';

 
  
  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public persistentData : PersistentData) {
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

  captureDataUrl: string;
  async capture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.upload();
    }, (err) => {
      // Handle error
    });
  }
  upload() {
    let storageRef = storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, storage.StringFormat.DATA_URL).then((snapshot)=> {
      // Do something here when the data is succesfully uploaded!      
        this.visitorImgURL = imageRef.getDownloadURL();
    //    this.urlObj = imageRef.getDownloadURL();
     });
  }

  endRegister(visitorReport: string, visitorScore: number): void {
    let visitorImgURL = this.visitorImgURL.i;
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
