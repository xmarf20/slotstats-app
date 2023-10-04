import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators'

export interface Slot {
  id?: string;
  name: string;
  maxWin: number;
  maxMultiplier: number;
}

@Injectable({
  providedIn: 'root'
})
export class SlotsService {

  public slotCollection: any;
  public slots: Slot[];

  constructor(private firestore: AngularFirestore) {
    this.slotCollection = this.firestore.collection('slots');
    this.slots = this.slotCollection.snapshotChanges().pipe(
      // @ts-ignore
      map(actions => actions.map((a: { payload: { doc: { data: () => any; }; }; }) => a.payload.doc.data()))
    )
  }

  async addSlot(data: Slot): Promise<void> {
    try {
      await this.slotCollection.add(data);
    } catch (err) {
      console.log(err);
    }
  }

  async updateMaxWin(id: string, win: number, bet: number): Promise<void> {
    try {
      await this.slotCollection
        .doc(id)
        .set({maxWin: win, maxWinBet: bet}, {merge: true});
    } catch (err) {
      console.log(err);
    }
  }

}
