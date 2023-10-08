import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-slot-add',
  templateUrl: './slot-add.component.html'
})
export class SlotAddComponent {
  public formData = new FormGroup({
    name: new FormControl('', Validators.required),
    bet: new FormControl('', Validators.required),
    maxWin: new FormControl('', Validators.required),
  });

  public constructor(
    public dialogRef: MatDialogRef<SlotAddComponent>
  ) {
  }
}
