import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { PersistentData } from '../../providers/persistentData/persistentData';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public myPerson = {preMail: '', usernameValue :'', avatarURL : {i : ''}};
  public myPlace = { urlImagem : ''};
  public nearSomePlace: boolean;
  public messageToUser: string;
  public imageHidder: number;

  constructor(public navCtrl: NavController, public authData: AuthProvider,  public persistentData: PersistentData,public navParams: NavParams){}

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
     personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
      if(this.myPerson.avatarURL != null){
        document.getElementById('homeAvatar').setAttribute('src', this.myPerson.avatarURL.i);
    
        
      }
    });
  }

  ionViewDidEnter() {
    this.checkIfNearLocation();

    const placeRef: firebase.database.Reference = firebase.database().ref('Places/' + this.persistentData.locationFirebaseName);
    placeRef.on('value', personSnapshot => {
      this.myPlace = personSnapshot.val();
    
      try {
        if(this.myPlace != null)
        {
          document.getElementById('placeImage').setAttribute('src', this.myPlace.urlImagem);
        }
      }
      catch(e)
      {
        console.log("URL da imagem do lugar não foi carregada do Firebase");
      }
    });

    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.preMailSingleton);
     personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
      if(this.myPerson.avatarURL != null){
        document.getElementById('homeAvatar').setAttribute('src', this.myPerson.avatarURL.i);

         this.persistentData.usernameValue = this.myPerson.usernameValue;
         
         this.persistentData.userIdentifier = this.myPerson.preMail;
         this.persistentData.userAvatarURL = this.myPerson.avatarURL.i;
        console.log("User Name Value: " + this.persistentData.usernameValue);
        
        console.log("User Identifier:  " + this.persistentData.userIdentifier );


      }
    });

  }
  checkIfNearLocation()
  {
    this.nearSomePlace = this.persistentData.isCloseToLocation;
    if(this.nearSomePlace)
    {
      this.messageToUser = "Pertinho de " + this.persistentData.locationFirebaseName;
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
       this.persistentData.usernameValue = this.myPerson.usernameValue;
      console.log("Acabou fincando " + this.persistentData.usernameValue + " mesmo.");
      this.navCtrl.push('LocationPage');
      
  }


}