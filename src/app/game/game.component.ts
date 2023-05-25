
//@ts-check
import { Component, OnInit , inject} from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  collection,
  collectionData,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  pickCardAnimation = false;
  currentCard: string = '';
  private firestore: Firestore = inject(Firestore);
  game$: Observable<any[]>;
  // games: Array<any> = [];
 

  constructor(public dialog: MatDialog) {
    const gameCollection = collection(this.firestore, 'games');
    this.game$ = collectionData(gameCollection);

    this.game$.subscribe((newGame) => {
       console.log('neues Spiel', newGame);
      });
  }
  


  ngOnInit(): void {
    this.newGame();
    // this.firestore
    //   .collection('games')
    //   .valueChanges()
    //   .subscribe((game: Array<string>) => {
    //     console.log('neues game', game);
    //   });
    }
  

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  // TODO  ggf. bei take Card abfangen wenn keine Karten mehr da sind:
  //   if(this.game.stack.length > 0){
  //   this.currentCard = this.game.stack.pop() as string;
  // } else {

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      // TODO: logs raus
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      // TODO logs raus
      console.log(this.game.playedCards);
    }
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) this.game.players.push(name);
    });
  }
}
