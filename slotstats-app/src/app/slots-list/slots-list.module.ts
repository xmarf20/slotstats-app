import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

import {environment} from "../../environments/environment";
import {RouterModule} from "@angular/router";
import {SlotsListComponent} from "./slots-list.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    SlotsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: SlotsListComponent,
      }
    ]),
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class SlotsListModule {
}
