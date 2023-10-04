import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FormControl} from "@angular/forms";
import {map} from "rxjs/operators";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-bonus-hunt',
  templateUrl: './bonus-hunt.component.html',
  styleUrls: ['./bonus-hunt.component.scss']
})
export class BonusHuntComponent implements OnInit {

  bhCollection: AngularFirestoreCollection<any> | undefined;

  slots: any;
  public sortedSlots;
  public bonushunts;

  public slotName = new FormControl('');
  public slotMaxWin = new FormControl('');
  public slotBet = new FormControl('');

  public slotCount = 0;
  public totalWin;

  public stats = {
    bonusCount: this.slotCount,
    wins: [],
    totalWin: 0,
    // @ts-ignore
    avgWin: 0,
  }

  constructor(private firestore: AngularFirestore) {
  }

  async ngOnInit() {
    this.bhCollection = this.firestore.collection<any>('bonushunts');

    this.bonushunts = this.bhCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
      );
    // this.slots = this.bhCollection.snapshotChanges()
    //   .pipe(
    //     map(actions => actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       this.stats.wins.push(a.payload.doc.data().maxWin);
    //       this.stats.avgWin = this.totalWin / this.slotCount;
    //       this.stats.bonusCount = this.stats.wins.length;
    //       return {id, ...data};
    //     }))
    //   );
    console.log(this.bonushunts);
  }

  async addSlot(): Promise<void> {
    let slot = {
      name: this.slotName.value,
      bet: this.slotBet.value,
      maxWin: this.slotMaxWin.value,
      maxMultiplier: (this.slotMaxWin.value / this.slotBet.value),
      order: this.slotCount
    }
    try {
      if (slot.name !== '' && slot.bet !== '' && slot.maxWin !== '') {
        // @ts-ignore
        await this.bhCollection.add(slot);
        this.slotCount++;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateMaxWin(id: string, win: number, bet: number): Promise<void> {
    try {
      // @ts-ignore
      await this.slotCollection
        .doc(id)
        .set({maxWin: win, maxWinBet: bet}, {merge: true});
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // @ts-ignore
      await this.bhCollection.doc(id).delete();
    } catch (err) {
      console.log(err);
    }
  }

  public sortData(sort: Sort) {
    const data = this.slots;
    if (!sort.active || sort.direction === '') {
      this.sortedSlots = data;
      return;
    }

    this.sortedSlots = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'order':
          return this.compare(a.order, b.order, isAsc);
        case 'bet':
          return this.compare(a.maxWinBet, b.maxWinBet, isAsc);
        case 'maxWin':
          return this.compare(a.maxWinBet, b.maxWinBet, isAsc);
        case 'maxMultiplier':
          return this.compare(a.maxMultiplier, b.maxMultiplier, isAsc);
        default:
          return 0;
      }
    });
  }

  public compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
