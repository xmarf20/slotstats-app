import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

import {BonusHuntComponent} from "./bonus-hunt.component";
import {environment} from "../../environments/environment";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    BonusHuntComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: BonusHuntComponent,
      }
    ]),
    MatSortModule
  ],
})
export class BonusHuntModule {
}
