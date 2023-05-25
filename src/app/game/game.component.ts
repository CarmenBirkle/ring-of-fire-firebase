
//@ts-check
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  pickCardAnimation = false;
  currentCard: string = '';

  constructor() {}

  ngOnInit(): void {
    this.newGame();
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
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }     
}
