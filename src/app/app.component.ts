import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  Shelters = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: AngularFirestore,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.db.collection(`Shelters`, q => q.orderBy('Name'))
    .snapshotChanges().subscribe(serverItems => {
      this.Shelters = [];
      serverItems.forEach(a => {
        let shelter:any = a.payload.doc.data();
        shelter.id = a.payload.doc.id;
        this.Shelters.push(shelter);
      });
    });
  }
  add() {
    this.db.collection(`Shelters`).add({
      timestamp: new Date(),
    });
  }

  update(shelter) {
    this.db.doc(`Shelters/${shelter.id}`).update({
      timestamp: new Date(),
    });
  }

  delete(shelter) {
    this.db.doc(`Shelters/${shelter.id}`).delete();
  }
  


}
