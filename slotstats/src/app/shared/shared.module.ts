import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotEditComponent } from './slot-edit/slot-edit.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SlotAddComponent } from './slot-add/slot-add.component';



@NgModule({
  declarations: [
    SlotEditComponent,
    ConfirmDialogComponent,
    SlotAddComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
