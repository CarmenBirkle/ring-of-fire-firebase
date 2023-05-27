import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent {
  constructor(public dialogRef: MatDialogRef<ImprintComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
