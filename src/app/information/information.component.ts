import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent {
  constructor(public dialogRef: MatDialogRef<InformationComponent>) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
