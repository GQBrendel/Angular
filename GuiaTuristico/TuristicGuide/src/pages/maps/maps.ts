import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  ionViewDidEnter()
  {
    this.loadmap();
    this.addCustomMarks("Viamão");
    this.populateMap();
  }
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Your Location');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    }) 
  }

  getCurrentLocation()
  {
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController,private nativeGeocoder: NativeGeocoder) {
  }

  addMarker() {
    let prompt = this.alertCtrl.create({
      title: 'Add Marker',
      message: "Enter location",
      inputs: [
        {
          name: 'city',
          placeholder: 'City'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            
            this.geoCodeandAdd(data.city);
          }
        }
      ]
    });
    prompt.present();
  }
  geoCodeandAdd(city) {
    this.nativeGeocoder.forwardGeocode(city)
      .then((coordinates: NativeGeocoderForwardResult[]) => {
        let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([coordinates[0].latitude, coordinates[0].longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      })
  .catch((error: any) => console.log(error));
  }
  addCustomMarks(location : string)
  {
    console.log("Called Add Custo Location");
    this.nativeGeocoder.forwardGeocode(location)
    .then((coordinates: NativeGeocoderForwardResult[]) => {
      let markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker([coordinates[0].latitude, coordinates[0].longitude]).on('click', () => {
      alert('Marker clicked' + location);
    })
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);
    })
  .catch((error: any) => console.log(error));
  }
  populateMap()
  {    
    /*let place = {

      name: <string> 'Theatro São Pedro',
      id: <number> null,
      latitude: <number> -30.031867,
      longitude: <number> -51.230465,
      marker: <string> leaflet.marker([-30.031867, -51.230465]),
    };*/

    let markerSaoPedro = leaflet.marker(['-30.031867', '-51.230465']).addTo(this.map);
    markerSaoPedro.bindPopup("<b>Theatro São Pedro</b><br>Place Description.").on('click', () => {
      leaflet.openPopup();
    })

    let monumentoJulioDeCastilhos = leaflet.marker([ -30.032522, -51.230178]).addTo(this.map);
    monumentoJulioDeCastilhos.bindPopup("<b>Monumento Julio De Castilhos</b><br>Place Description.").on('click', () => {
      leaflet.openPopup();
    })

    let catedral = leaflet.marker([ -30.033853, -51.230704]).addTo(this.map);
    catedral.bindPopup("<b>Catedral Metropolitana de Porto Alegre!</b><br>Place Description.").on('click', () => {
      leaflet.openPopup();
    })
    let CDC = leaflet.marker([-30.031012,-51.234195]).addTo(this.map);
    CDC.bindPopup("<b>Casa de Cultura Mário Quintana</b><br>Place Description.").on('click', () => {
      leaflet.openPopup();
    })
  }
  includeSaoPedro(location : string)
  {
    console.log("Called Add Custo Location");
    this.nativeGeocoder.forwardGeocode(location)
    .then((coordinates: NativeGeocoderForwardResult[]) => {
      let markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker(['-30.031867', '-51.230465']).on('click', () => {
      alert('Marker clicked' + location);
    })
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);
    })
  .catch((error: any) => console.log(error));
  }

}
