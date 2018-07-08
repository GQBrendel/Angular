// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  // constructor(public http: HttpClient) {
    constructor(){
    console.log('Hello LocationProvider Provider');
  }  
  public latitudeSingleton:any = '';
  public longitudeSingleton:any = '';
  public isCloseToLocation : boolean = true;
  public closeLocationName : string = 'Woody';

}
