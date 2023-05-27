import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  allProfilePictures = ['profile1.png', 'profile2.png', 'profile3.png', 'profile4.png','profile5.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


