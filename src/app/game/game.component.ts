import { Component, OnInit , inject} from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  private firestore: Firestore = inject(Firestore);
  gameID: string = '';

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newGame();
  }

  async newGame() {
    this.game = new Game();
    console.log('game from cache', this.game);
    this.route.params.subscribe((params) => {
      this.gameID = params['id'];
      const gameCollection = collection(this.firestore, 'games');
      const documentReference = doc(gameCollection, params['id']);
      docData(documentReference).subscribe((game) => {
        console.log('game from db', game);
        this.game.players = game['players'];
        this.game.stack = game['stack'];
        this.game.playedCards = game['playedCards'];
        this.game.currentPlayer = game['currentPlayer'];
        this.game.player_images = game['player_images'];
        this.game.currentCard = game['currentCard'];
        this.game.pickCardAnimation = game['pickCardAnimation'];
        this.game.gameOver = game['gameOver'];
      });
    });
  }

  async restartGame() {
    this.game = new Game(); 
    const gameCollection = collection(this.firestore, 'games'); 
    let gameInfo = await addDoc(gameCollection, this.game.toJson()); 
    console.log(gameInfo);
    this.router.navigateByUrl('game/' + gameInfo.id); 
  }

  takeCard() {
    const card = this.game.stack.pop();
    if (this.game.players.length < 2) {
      this.openDialog();
    } else if (this.game.stack.length === 0) {
      this.game.gameOver = true;
      this.saveGame();
    } else if (!this.game.pickCardAnimation && card) {
      this.game.currentCard = card as string;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('profile1.png');
        this.saveGame();
      }
    });
  }

  async saveGame() {
    const gameCollection = collection(this.firestore, 'games');
    const documentReference = doc(gameCollection, this.gameID);
    await updateDoc(documentReference, this.game.toJson());
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
          this.saveGame();
        } else {
          this.game.player_images[playerId] = change;
          this.saveGame();
        }
      }
    });
  }
}
