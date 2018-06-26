import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public myPerson = {};
  constructor(public navCtrl: NavController){}

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
  }

  createPerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
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