import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
export interface Shelter {
    Address: string;
    Latitude: any;
    Longitude: any;
    Name : string;
    Shelter_ID:string;
}
@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private shelterCollections: AngularFirestoreCollection<Shelter>;
  private Shelters:Observable<Shelter[]>;

  constructor(firestore: AngularFirestore) {
      this.shelterCollections = firestore.collection<Shelter>('shelters');

      this.Shelters = this.shelterCollections.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data};
              })
          })
      )
  }
  getShelters() {
      return this.Shelters;
    }
   
  getShelter(id) {
      return this.shelterCollections.doc<Shelter>(id).valueChanges();      
  } 
  updateShelter(shelter: Shelter, id: string) {
      return this.shelterCollections.doc(id).update(shelter);
  }
  addShelter(shelter: Shelter) {
      return this.shelterCollections.add(shelter);
  }
  removeShelter(id) {
      return this.shelterCollections.doc(id).delete();
      }

}