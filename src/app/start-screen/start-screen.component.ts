import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  newGame() {
    //start a new game
    this.router.navigate(['/game']);
  }
}
