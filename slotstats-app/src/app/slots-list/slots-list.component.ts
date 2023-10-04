import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Slot} from "../services/slots.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {FormControl, FormGroup} from '@angular/forms';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'slots-list',
  templateUrl: './slots-list.component.html',
  styleUrls: ['./slots-list.component.scss']
})
export class SlotsListComponent implements OnInit, AfterViewInit {

  slotCollection: AngularFirestoreCollection<any> | undefined;
  slots: any;
  sortedSlots;

  public slotName = new FormControl('');
  public slotMaxWin = new FormControl('');
  public slotBet = new FormControl('');

  displayedColumns: string[] = ['name', 'bet', 'maxWin', 'maxX', 'trash'];

  constructor(private firestore: AngularFirestore,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.slots.sort = this.sort;
  }


  async ngOnInit() {
    this.slotCollection = this.firestore.collection<any>('slots');
    this.slots = this.slotCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          a.payload.doc.data().maxMultiplier = Math.round(a.payload.doc.data().maxMultiplier * 100) / 100
          return {id, ...data};
        }))
      );
  }

  async addSlot(): Promise<void> {
    let slot = {
      name: this.slotName.value,
      bet: this.slotBet.value,
      maxWin: this.slotMaxWin.value,
      maxMultiplier: (this.slotMaxWin.value / this.slotBet.value),
    }
    try {
      if (slot.name !== '' && slot.bet !== '' && slot.maxWin !== '') {
        // @ts-ignore
        await this.slotCollection.add(slot);
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
      await this.slotCollection.doc(id).delete();
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

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
