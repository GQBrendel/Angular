import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { PersistentData } from '../../providers/persistentData/persistentData';

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  dontplaceSecondMark: boolean = false;

  ionViewDidLoad()
  {    
    this.loadmap();
  }
  ionViewDidEnter()
  {
    this.populateMap();
    this.checkIfNearLocation();
    try{
      if(this.persistentData.latitudeSingleton < -29 )
      this.map.setView([this.persistentData.latitudeSingleton, this.persistentData.longitudeSingleton], 15);
    }
    catch(e){console.log(e)};
 
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

      if(!this.dontplaceSecondMark)
      {
        this.dontplaceSecondMark = true;
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
          alert('Your Location');
        })
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
      }
    
      }).on('locationerror', (err) => {
        alert(err.message);
    }) 
  }
  public getCurrentLocation()
  {
    this.map.locate().on('locationfound', (e) =>{
        console.log("Latitude do E " + e.latitude);
        console.log("Longitude do E " + e.longitude);

        this.persistentData.latitudeSingleton = e.latitude.toString();
        this.persistentData.longitudeSingleton = e.longitude.toString();
        
        console.log("Latitude do Singleton " +  this.persistentData.latitudeSingleton);
        console.log("Longitude do Singleton " +  this.persistentData.longitudeSingleton);

        let calculatedDistance = this.getDistanceFromLatLonInKm(this.persistentData.latitudeSingleton, this.persistentData.longitudeSingleton,
          -30.073605, -51.100933);

        console.log ("Distancia da minha posição para Turismo em Viamão eh de " + calculatedDistance + "km.");
      })
  }
  checkIfNearLocation()
  {
    this.getCurrentLocation();
    let lat = this.persistentData.latitudeSingleton;
    let long = this.persistentData.longitudeSingleton;


    if((this.getDistanceFromLatLonInKm(lat, long, -30.031867, -51.230465)) < 2) //Perto do Theatro São Pedro
    {
      this.persistentData.isCloseToLocation = true;
     this.persistentData.locationFirebaseName = "TheatroSaoPedro";
    }
    else if((this.getDistanceFromLatLonInKm(lat, long, -30.028760, -51.231705)) < 2) //Perto do MARGS
    {      
      this.persistentData.isCloseToLocation = true;
      this.persistentData.locationFirebaseName = "margs";
    }
    else if((this.getDistanceFromLatLonInKm(lat, long, -30.027154, -51.175086)) < 2) //Perto da Sinos
    {
      this.persistentData.isCloseToLocation = true;
      this.persistentData.locationFirebaseName = "Unisinos";
    }
    else if((this.getDistanceFromLatLonInKm(lat, long, -30.031012, -51.234195)) < 2) //Perto da Casa de Cultura
    {
      this.persistentData.isCloseToLocation = true;
      this.persistentData.locationFirebaseName = "casadecultura";
    }
    else if((this.getDistanceFromLatLonInKm(lat, long, -30.073605, -51.100933)) < 2) //Perto de Viamão
    {
      this.persistentData.isCloseToLocation = true;
      this.persistentData.locationFirebaseName = "Viamao";
    }
    else
    {
      this.persistentData.isCloseToLocation = true;
      this.persistentData.locationFirebaseName = "The Place That Never Was";  
    }

  }
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController,private nativeGeocoder: NativeGeocoder,
    public persistentData: PersistentData) { }

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
    
    this.getCurrentLocation();
    let lat = this.persistentData.latitudeSingleton;
    let long = this.persistentData.longitudeSingleton;

    let markerSaoPedro = leaflet.marker(['-30.031867', '-51.230465']).addTo(this.map);
    markerSaoPedro.bindPopup("<b>Theatro São Pedro</b><br>Place Description.").on('click', () => {
      leaflet.openPopup();
    })

    let margs = leaflet.marker([ -30.028760, -51.231705]).addTo(this.map);
    margs.bindPopup("<b>MARGS</b><br>Museu de Arte do Rio Grande do Sul.").on('click', () => {
      leaflet.openPopup();
    })

    let casadecultura = leaflet.marker([-30.031012,-51.234195]).addTo(this.map);
    casadecultura.bindPopup("<b>Casa de Cultura Mário Quintana</b><br>Place Description + this.getDistanceFromLatLonInKm(lat, long, -30.031012, -51.234195").on('click', () => {
      leaflet.openPopup();
    })
    let unisinos = leaflet.marker([-30.027154,-51.175086]).addTo(this.map);
    unisinos.bindPopup("<b>Unisinos Porto Alegre</b><br>Place Description.").on('click', () => {
      leaflet.openPopup();
    })
    let viamao = leaflet.marker([-30.073605, -51.100933]).addTo(this.map);
    viamao.bindPopup("<b>Viamão</b><br>Desenvolvimento é aqui.").on('click', () => {
      leaflet.openPopup();
    })
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
