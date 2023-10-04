import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

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
  private dbPath = 'bonushunts';
  public bhCollection: any;
  public slots: Slot[] = [];
  bonusHunts: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.bonusHunts = firestore.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection {
    return this.bonusHunts;
  }

  create(data: any): void {
    this.bonusHunts.add({ ...data });
  }

  update(id: string, data: any): Promise<void> {
    return this.bonusHunts.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.bonusHunts.doc(id).delete();
  }
}
