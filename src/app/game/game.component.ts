import { Component, OnInit } from '@angular/core';
import { CreatedGameServiceService } from '../services/created-game-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  playerName: string = "";
  playerCardsSum: number = 0;
  turns: number = 0;
  botCardsSum: number = 0;
  gameEndingState: string = "";
  gameOverMessage: string = "";

  constructor(private router: Router , private createdGameService: CreatedGameServiceService){}

  ngOnInit(): void {

  this.createdGameService.getGameId();
  this.playerName = this.createdGameService.getPlayer();
  }

  requestCard(): void {
    fetch(`${import.meta.env['NG_APP_API_URL']}/api/games/card-request/${this.createdGameService.getGameId()}`)
    .then((response) => response.json())
    .then((response) => {
      this.isGameActive(response);
      console.log(response);
    });
  }
  
  flipCards(): void {
    fetch(`${import.meta.env['NG_APP_API_URL']}/api/games/card-flip/${this.createdGameService.getGameId()}`)
    .then((response) => response.json())
    .then((response) => {
      this.botCardsSum = response.enemyCardsSum;
      this.gameEndingState = response.isWinner;
      this.turns = response.lastRound;
    });
  }

  isGameActive(response: any): void {
    if (response.message) {
      this.gameOverMessage = response.message;
    } else {
      this.playerCardsSum = response.cardsSum;
    }
  }

  mainMenu(): void {
    this.router.navigate(["/"]);
  }

  newGame(): void {
    this.gameOverMessage = "";
    this.gameEndingState = "";
    this.playerCardsSum = 0;
    this.turns = 0;
    this.botCardsSum = 0;

    const requestBodyPlayerName = {
      name: this.playerName
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBodyPlayerName),
    };

    fetch(import.meta.env['NG_APP_API_URL']+"/api/games/new-game", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        this.createdGameService.setGameId(response.gameId);
      });
  }
}
