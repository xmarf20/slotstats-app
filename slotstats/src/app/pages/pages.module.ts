import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotListComponent } from './slot-list/slot-list.component';
import { BonusHuntComponent } from './bonus-hunt/bonus-hunt.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    SlotListComponent,
    BonusHuntComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class PagesModule { }
