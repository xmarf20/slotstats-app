import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BonusHuntModule} from "./bonus-hunt/bonus-hunt.module";
import {SlotsListModule} from "./slots-list/slots-list.module";

const routes: Routes = [
  {
    path: 'slots',
    loadChildren: () => SlotsListModule
  }, {
    path: 'bonus-hunt',
    loadChildren: () => BonusHuntModule
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
