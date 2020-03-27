import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public afAuth: AngularFireAuth) {

  }

  signOut(){
    this.afAuth.auth.signOut().then(() => {
      location.reload();
    });
  }

}
