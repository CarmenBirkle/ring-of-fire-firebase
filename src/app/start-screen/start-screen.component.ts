import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  game!: Game;
  stars = new Array(100);
  constructor(private router: Router, private firestore: Firestore) {}
  
  ngOnInit(): void {}

  async newGame() {
    //start a new game
    this.game = new Game(); // start a new game
    const gameCollection = collection(this.firestore, 'games'); /// hole die collection in Firestore an der Stelle "todos
    let gameInfo = await addDoc(gameCollection, this.game.toJson()); // setze einen neuen Wert (neues ID dokument (URL))
    console.log(gameInfo);
    this.router.navigateByUrl('game/' + gameInfo.id);    // navigiere zu dem angegebenen Pfad (game/id)
  }
}
