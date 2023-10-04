import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusHuntComponent } from './bonus-hunt/bonus-hunt.component';
import { SlotsListComponent } from './slots-list/slots-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [BonusHuntComponent, SlotsListComponent, DashboardComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
