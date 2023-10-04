import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators'

export interface Slot {
  order: string;
  name: string;
  maxWin: number;
  maxMultiplier: number;
}

@Injectable({
  providedIn: 'root'
})
export class BonusHuntService {
  private dbPath = '/bonushunts';
  public bhCollection: any;
  public slots: Slot[];
  bonusHunts: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.bonusHunts = firestore.collection('bonushunts');
  }
  getAll(): AngularFirestoreCollection {
    return this.bonusHunts;
  }
  create(data): any {
    let huntNumber = this.bonusHunts.valueChanges()
      .subscribe( result => {
        console.log(result.length);
      })
    return this.bonusHunts.add({ ...data });
  }
  update(id: string, data: any): Promise<void> {
    return this.bonusHunts.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.bonusHunts.doc(id).delete();
  }

}
