import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonusHuntComponent } from './pages/bonus-hunt/bonus-hunt.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => DashboardComponent
  }, {
    path: 'bonus-hunt',
    loadChildren: () => BonusHuntComponent
  }, {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
