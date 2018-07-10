import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { PersistentData } from '../../providers/persistentData/persistentData';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public myPerson = {usernameValue: '', avatarURL : {i : ''}};
  public avatarURL;

  
  constructor(private camera: Camera, public navCtrl: NavController, public persistentData: PersistentData,
    public navParams: NavParams, public authData: AuthProvider) {
    // var metadata = {
    //   contentType: 'image/jpeg'
    // }
  }

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
     personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
      

      if(this.myPerson.avatarURL != null){
        document.getElementById('profileAvatar').setAttribute('src', this.myPerson.avatarURL.i);
      }
    });
  }
  ionViewDidEnter()
  {
     document.getElementById('profileAvatar').setAttribute('src', this.myPerson.avatarURL.i);
     console.log("My avatar URL sem i" + JSON.stringify(this.myPerson.avatarURL));
    console.log("My avatar URL com i " + JSON.stringify(this.myPerson.avatarURL.i));
    
    console.log("My avatar URL com i sem stringify" + this.myPerson.avatarURL.i);
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
      
        this.avatarURL = imageRef.getDownloadURL();
        
      
     });
  }
  createPerson(firstName: string, profileDescription: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
    personRef.set({
      firstName,
      profileDescription
    })
  }
  removePerson(): void {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
    personRef.remove()
  }
  updatePerson(usernameValue: string, profileDescription: string): void {
    let avatarURL = this.avatarURL;
    if(avatarURL == null && this.myPerson.avatarURL.i == null)
    {
      avatarURL = "AvatarNotSet";
    }
    if (profileDescription == null)
    {
      profileDescription = "Descrição Pessoal";
    }
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
    personRef.update({
      usernameValue,
      profileDescription,
      avatarURL
    })    
  }
}
