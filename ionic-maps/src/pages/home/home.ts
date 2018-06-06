import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google : any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad()
  {
     this.showMap();   
  }
  showMap()
  {
  
      const location = new google.maps.LatLng(-30.026978, -51.174990);
      const options = {
          center: location,
          zoom: 17
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement,options);

  }



}
