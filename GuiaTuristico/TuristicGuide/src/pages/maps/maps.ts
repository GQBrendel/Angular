import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { LocationProvider } from '../../providers/location/location';

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
    this.getCurrentLocation();
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
  public getCurrentLocation()
  {
    this.map.locate().on('locationfound', (e) =>{
        console.log("Latitude do E " + e.latitude);
        console.log("Longitude do E " + e.longitude);

        this.locationData.latitudeSingleton = e.latitude.toString();
        this.locationData.longitudeSingleton = e.longitude.toString();
        
        console.log("Latitude do Singleton " +  this.locationData.latitudeSingleton);
        console.log("Longitude do Singleton " +  this.locationData.longitudeSingleton);



        let calculatedDistance = this.getDistanceFromLatLonInKm(this.locationData.latitudeSingleton, this.locationData.longitudeSingleton,
          -30.031867, -51.230465);

        console.log ("Distancia da minha posição para Theatro São Pedro eh de " + calculatedDistance + "km.");
      })
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController,private nativeGeocoder: NativeGeocoder,
    public locationData: LocationProvider) { }

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


  //Source: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
