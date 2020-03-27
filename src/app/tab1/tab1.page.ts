import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  MarkerCluster
} from '@ionic-native/google-maps';
import { ToastController, Platform, LoadingController } from '@ionic/angular';
import { SupplyService } from '../services/supply.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  map: GoogleMap;
  loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    public supply: SupplyService) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          "lat": 29.4241,
          "lng": -98.4936
        },
        'zoom': 10
      }
    });
    //lat: 29.4241, lng: -98.4936 }, zoom: 10,
    this.addCluster(this.locationData());

  }

  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
    .catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }


  addCluster(data) {
    let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: data,
      icons: [
        {
          min: 4,
          max: 13,
          url: "./assets/markercluster/small.png",
          label: {
            color: "white"
          }
        },
        {
          min: 14,
          url: "./assets/markercluster/large.png",
          label: {
            color: "white"
          }
        }
      ]
    });

    markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
      let marker: Marker = params[1];
      marker.setTitle(marker.get("name"));
      marker.setSnippet(marker.get("address"));
      marker.showInfoWindow();

      
    });

  }
  locationData(){
    return[
      {
        "position": {
          "lat": 29.549491,
          "lng": -98.514086
        },
        "name": "Winston Churchill High School",
        "address": "12049 Blanco Rd, San Antonio, TX 78216",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.421825,
          "lng": -98.51892
        },
        "name": "Sidney Lanier High School",
        "address": "1514 W César E Chávez Blvd, San Antonio, TX 78207",
        "icon": "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
      },
      {
        "position": {
          "lat": 29.38845,
          "lng": -98.44215
        },
        "name": "Highlands High School",
        "address": "3118 Elgin Ave, San Antonio, TX,78210",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.463562,
          "lng": -98.463562
        },
        "name": "Earl Warren High School",
        "address": "7611 Marbach Rd, San Antonio, TX 78227 ",
        "icon": "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
      },
      {
        "position": {
          "lat": 29.41944,
          "lng": -98.640146
        },
        "name": "John Jay High School",
        "address": "7611 Marbach Rd, San Antonio, TX 78227 ",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.35086,
          "lng": -98.548667
        },
        "name": "South San High School",
        "address": "7535 Barlite Blvd, San Antonio, TX 78224",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.4040752,
          "lng": -98.487609
        },
        "name": "G.W Brackenridge High School",
        "address": "400 Eagleland Dr, San Antonio, TX 78210",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.508452,
          "lng": -98.389703
        },
        "name": "Theodore Roosevelt High School",
        "address": "5110 Walzem Rd, San Antonio, TX 78218",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.491478,
          "lng": -98.465851
        },
        "name": "Alamo Heights High School",
        "address": "6900 Broadway St, San Antonio, TX, 78209",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.436189,
          "lng": -98.485954
        },
        "name": "Central Catholic High School",
        "address": "1403 N St Mary's St, San Antonio, TX, 78215",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.512307,
          "lng": -98.621592
        },
        "name": "John Marshall High School",
        "address": "8000 Lobo Ln, San Antonio, TX 78240",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.472825,
          "lng": -98.50575
        },
        "name": "Thomas Edison High School",
        "address": "701 Santa Monica, San Antonio, TX 78212",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.364373,
          "lng": -98.501765
        },
        "name": "Harlandale High School",
        "address": "114 E Gerald Ave, San Antonio, TX 78214",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.425379,
          "lng": -98.399204
        },
        "name": "Sam Houston High School",
        "address": "4635 E Houston St, San Antonio, TX 78220",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.395529,
          "lng": -98.557227
        },
        "name": "John F. Kennedy High School",
        "address": "1922 S General McMullen Dr, San Antonio, TX 78226",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      },
      {
        "position": {
          "lat": 29.549491,
          "lng": -98.514086
        },
        "name": "Main Center",
        "address": "3642 E Houston St, San Antonio, TX 78219",
        "icon": "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      }
    ];
  }
}
