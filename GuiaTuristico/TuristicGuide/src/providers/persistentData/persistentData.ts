// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PersistentData provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersistentData {

  // constructor(public http: HttpClient) {
    constructor(){
    console.log('Hello PersistentData Provider');
  }  
  public latitudeSingleton:any = '';
  public longitudeSingleton:any = '';
  public isCloseToLocation : boolean = false;
  public locationFirebaseName: string = '';
  public totalVisits: number = 0;

  public usernameValue: string = 'Sucrilhos';
  public userIdentifier: string = 'NOT DEFINED';
  public userAvatarURL: string = 'NOT DEFINED';


}
