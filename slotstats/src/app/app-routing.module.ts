import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotListComponent } from './pages/slot-list/slot-list.component';
import { BonusHuntComponent } from './pages/bonus-hunt/bonus-hunt.component';

const routes: Routes = [
  {
    path: 'slot-list',
    component: SlotListComponent,
  },
  {
    path: 'bonus-hunt',
    component: BonusHuntComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
