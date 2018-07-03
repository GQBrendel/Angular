import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public myPerson = {};
  constructor(public navCtrl: NavController, public authData: AuthProvider){}

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + this.authData.userNameSingleTon);
    var starCountRef = firebase.database().ref('posts/' + 2 + '/starCount');
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
    console.log("Person Ref is " + personRef);
  }

  createPerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref('Users/' + firstName);
    personRef.set({
      firstName,
      lastName
    })
  }
  removePerson(): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.remove()
  }
  updatePerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.update({
      firstName,
      lastName
    })

    
  }

}