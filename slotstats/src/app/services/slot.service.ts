import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

export interface Slot {
  id: string;
  bet: number;
  name: string;
  maxWin: number;
  maxMultiplier: number;
}

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  public slotCollection: AngularFirestoreCollection<Slot>;

  constructor(private firestore: AngularFirestore) {
    this.slotCollection = firestore.collection('/slots');
  }

  public getSlotById(id: string): Slot | undefined {
    let slot: Slot | undefined;
    this.slotCollection.doc(id).ref.get().then(doc => {
      slot = doc.data();
    });

    return slot;
  }

  public getAllSlots(): AngularFirestoreCollection<Slot> {
    return this.slotCollection;
  }

  public addSlot(slot: Slot): any {
    return this.slotCollection.add({ ...slot });
  }

  public update(id: string, data: any): Promise<void> {
    return this.slotCollection.doc(id).update(data);
  }

  public removeSlot(id: string): Promise<void> {
    return this.slotCollection.doc(id).delete();
  }
}
