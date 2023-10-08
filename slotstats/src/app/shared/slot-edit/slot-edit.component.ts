import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Slot } from 'src/app/services/slot.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slot-edit',
  templateUrl: './slot-edit.component.html'
})
export class SlotEditComponent {
  public formData = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    bet: new FormControl(this.data.bet, Validators.required),
    maxWin: new FormControl(this.data.maxWin, Validators.required),
  });

  public constructor(
    public dialogRef: MatDialogRef<SlotEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Slot,
    private snackBar: MatSnackBar,
  ) {
  }

  public deleteSlot() {
    let snackRef = this.snackBar.open('Slot wirklich löschen?', 'JA', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    snackRef.onAction().subscribe(() => {
      this.dialogRef.close('delete');
    })
  }
}
