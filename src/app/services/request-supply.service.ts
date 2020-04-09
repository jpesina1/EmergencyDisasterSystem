import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable, Timestamp } from 'rxjs';
import {map} from 'rxjs/operators'
export interface Request {
    Time: Date;
    Item: string;
    Name : string;
    ID:string;
    
}
@Injectable({
  providedIn: 'root'
})
export class RequestSupplyService {
  private requestCollections: AngularFirestoreCollection<Request>;
  private Requests:Observable<Request[]>;

  constructor(firestore: AngularFirestore) {
      this.requestCollections = firestore.collection<Request>('requests');

      this.Requests = this.requestCollections.snapshotChanges().pipe(
          map(actions => {
              return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data};
              })
          })
      )
  }
  getRequests() {
      return this.Requests;
    }
   
  getRequest(id) {
      return this.requestCollections.doc<Request>(id).valueChanges();      
  } 
  updateRequest(request: Request, id: string) {
      return this.requestCollections.doc(id).update(request);
  }
  addRequest(request: Request) {
      return this.requestCollections.add(request);
  }
  removeRequest(id) {
      return this.requestCollections.doc(id).delete();
      }

}