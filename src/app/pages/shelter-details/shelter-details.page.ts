import { Component, OnInit } from '@angular/core';
import { Shelter, ShelterService } from 'src/app/services/shelter.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController, Platform} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
} from '@ionic-native/google-maps';
import { last } from 'rxjs/operators';
import { Button } from 'protractor';

@Component({
  selector: 'app-shelter-details',
  templateUrl: './shelter-details.page.html',
  styleUrls: ['./shelter-details.page.scss'],
})
export class ShelterDetailsPage implements OnInit {
  map: GoogleMap;
  loading: any;
  latx: number;
  lngx: number;
  //declare latz: number;
  shelter: Shelter = {
    Address: '123 Street',
    Latitude: 26,
    Longitude: -98,
    Name : 'First High School',
    Shelter_ID: 'First',
    Condition: "Good",
    Population: 100
  }
  Shelter_ID = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private shelterService:ShelterService, 
    private loadingController: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    public Shelter: ShelterService,

    ) { }
 
  
  async ngOnInit(){
    this.Shelter_ID = this.route.snapshot.params['id'];
    if (this.Shelter_ID)  {
      this.loadShelter();

    }
    await this.platform.ready();
    //await this.loadMap();
  }
  async loadShelter() {
    const loading = await this.loadingController.create({
      message: 'Loading Shelter..'
    });
    await loading.present();
 
    this.shelterService.getShelter(this.Shelter_ID).subscribe(res => {
      loading.dismiss();
      this.shelter = res;
      var lat = this.shelter.Latitude;
      var lng = this.shelter.Longitude;
      var cond= this.shelter.Condition;
      var Sname = this.shelter.Name;
      var Saddress = this.shelter.Address;
      this.locationMap(lat,lng,cond,Sname,Saddress);
      });
  }
  locationMap(a: number, b: number, cond: string,Sname: string,Saddress: string) {
    var something;
    if(cond == "Abundant"){
      something = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    }
    else if (cond == "Ample"){
      something ="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }
    else if (cond == "Moderate"){
      something ="http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
    }
    else if (cond == "Critical"){
      something ="http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
    else {
      something = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
    
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
         
          "lat":a,
          "lng":b,
        },
        'zoom': 12
      }
    });
    let marker: Marker = this.map.addMarkerSync({
      name: Sname,
      address: Saddress,
      "position": {
        "lat":a,
        "lng":b,
      },
      animation: GoogleMapsAnimation.BOUNCE,
      icon: something,
      //"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });

    // show the infoWindow
    marker.setTitle(marker.get("name"));
    marker.setSnippet(marker.get("address"));
    marker.showInfoWindow();

  }
  
    async saveShelter() {
 
      const loading = await this.loadingController.create({
        message: 'Saving Shelter..'
      });
      await loading.present();
   
      if (this.Shelter_ID) {
        this.shelterService.updateShelter(this.shelter, this.Shelter_ID).then(() => {
          loading.dismiss();
          this.nav.back();
      });
      } else {
        this.shelterService.addShelter(this.shelter).then(() => {
          loading.dismiss();          
          this.nav.back();

        });
      }
    }
    loadMap() {    
      //var lat = parseFloat(document.getElementById('latitude'));
      //var lng = parseFloat(document.getElementById('lng').value);

      var lat = parseFloat(this.shelter.Latitude.value)
      console.log(lat);
      var long = parseFloat(this.shelter.Longitude.value);
      console.log(long);
      this.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
           
            "lat":29.549491,
            "lng":-98.514086,
          },
          'zoom': 12
        }
      });
      //lat: 29.4241, lng: -98.4936 }, zoom: 10,
        // add a marker
        let marker: Marker = this.map.addMarkerSync({
          position: {
            lat:29.549491,
            lng:-98.514086,
          },
          animation: GoogleMapsAnimation.BOUNCE,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
  
        // show the infoWindow
        marker.showInfoWindow();
  
    }
    async onButtonClick() {
      this.map.clear();
  
      this.loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      await this.loading.present();
    }
    async showToast(message: string) {
      let toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'middle'
      });
  
      toast.present();
    }

  


  }
