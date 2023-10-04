import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Slot, SlotService } from 'src/app/services/slot.service';

@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html'
})
export class SlotListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'bet', 'maxWin', 'maxMultiplier', 'delete'];
  public dataSource: MatTableDataSource<Slot>;
  public slotList: Slot[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private slotService: SlotService
  ) {
    this.dataSource = new MatTableDataSource(this.slotList);
    this.dataSource.sort = this.sort;
  }

  public ngOnInit(): void {
    this.retrieveSlots();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private retrieveSlots(): void {
    this.slotService.getAllSlots().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.slotList = data;
      this.setTableData();
    })
  }

  private setTableData() {
    this.dataSource = new MatTableDataSource(this.slotList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteEntry(event: Event) {

  }
}
