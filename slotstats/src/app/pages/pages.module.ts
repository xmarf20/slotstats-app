import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotListComponent } from './slot-list/slot-list.component';
import { BonusHuntComponent } from './bonus-hunt/bonus-hunt.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SlotListComponent,
    BonusHuntComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ]
})
export class PagesModule { }
