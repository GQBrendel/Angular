import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
    var metadata = {
      contentType: 'image/jpeg'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
  async takePhoto()
  {/*
    this.capture();/*
    //Defining Camera Options:
    try     {      
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE      
      }
        const result = await this.camera.getPicture(options);

        const image = `data:image/jpeg;base64${result}`;
        const pictures = storage().ref('Image');
        //pictures.putString(image, 'base64');      
        pictures.putString(image, 'base64');
        
    }
    catch(e){
        console.error(e);
    }*/
  }
  upload() {
    let storageRef = storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, storage.StringFormat.DATA_URL).then((snapshot)=> {
      // Do something here when the data is succesfully uploaded!
     });
  }

}
