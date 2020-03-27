import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'


export interface Supply {
  Name : string;  
  Address: string;
  Shelter_ID:string;
  Max_Population: number;
  Delivery_Time:string;
  Shelter_Condition:string;
  WaterBottles_24pk_16oz: number;
  WaterPurificationTablets_20pk: number;
  Canned_Chicken_7oz_8pk: number;
  Canned_Tuna_7oz_12pk: number;
  Canned_Spam_12oz_8pk: number;
  Canned_Soup_Beef_Vegetable_11oz_12pk: number;
  Canned_Soup_Chicken_Noodle_11oz_12pk: number;
  Canned_Vegetable_Beets_106oz: number;
  Canned_Vegetable_Carrot_106oz: number;
  Canned_Vegetable_Corn_106oz: number;
  Canned_Vegetable_GreenBean_106oz: number;
  Canned_Vegetable_Mixed_106oz: number;
  Crackers_Wheat_8pk: number;
  Crackers_Original_8pk: number;
  Dry_Granola_Bars_2pk: number;
  Package_SaltedPeanuts_48pk_1oz: number;
  Package_MixedNuts_48pk_1oz: number;
  Package_TrailMix_24pk_2oz: number;
  Peanut_Butter_16oz: number;
}
@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  private supplyCollections: AngularFirestoreCollection<Supply>;
  private Supplies:Observable<Supply[]>;

  constructor(firestore: AngularFirestore) {
      this.supplyCollections = firestore.collection<Supply>('supplies');

      this.Supplies = this.supplyCollections.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data};
              })
          })
      )
  }
  getSupplies() {
      return this.Supplies;
    }
   
  getSupply(id) {
      return this.supplyCollections.doc<Supply>(id).valueChanges();      
  } 
  updateSupply(supply: Supply, id: string) {
      return this.supplyCollections.doc(id).update(supply);
  }
  addSupply(supply: Supply) {
      return this.supplyCollections.add(supply);
  }
  removeSupply(id) {
      return this.supplyCollections.doc(id).delete();
      }

}