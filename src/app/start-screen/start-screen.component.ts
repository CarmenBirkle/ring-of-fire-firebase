import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

import { InformationComponent } from '../information/information.component';
import {
  MatDialog
} from '@angular/material/dialog';
import { ImprintComponent } from '../imprint/imprint.component';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  game!: Game;
  stars = new Array(100);
  constructor(
    private router: Router,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async newGame() {
    this.game = new Game(); 
    const gameCollection = collection(this.firestore, 'games'); 
    let gameInfo = await addDoc(gameCollection, this.game.toJson()); 
    console.log(gameInfo);
    this.router.navigateByUrl('game/' + gameInfo.id); 
  }

  openInfo(): void {
    const dialogRef = this.dialog.open(InformationComponent);
  }

  openImprint(): void {
    const dialogRef = this.dialog.open(ImprintComponent);
  } 
}
