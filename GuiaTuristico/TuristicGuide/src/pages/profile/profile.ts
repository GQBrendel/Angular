import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
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

  public myPerson = {usernameValue: '', avatarURL : ''};
  public avatarURL: any;

  public loading:Loading;
  
  constructor(private camera: Camera, public navCtrl: NavController, public persistentData: PersistentData,
    public navParams: NavParams, public authData: AuthProvider,  public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
     personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
      

      if(this.myPerson.avatarURL != null){
        document.getElementById('profileAvatar').setAttribute('src', this.myPerson.avatarURL);
      }
    });
  }
  ionViewDidEnter()
  {
    try {
      document.getElementById('profileAvatar').setAttribute('src', this.myPerson.avatarURL);
 
      }
      catch(e) {
        console.log(e);
      }
      
  
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
    
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);

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
    
    let avatarURL = this.avatarURL.i;
    if(avatarURL == null)
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

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
      alert('Perfil Atualizado');
    }, 3000);
  }
}
