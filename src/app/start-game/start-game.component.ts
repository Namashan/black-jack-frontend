import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatedGameServiceService } from '../services/created-game-service.service';


@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './start-game.component.html',
  styleUrl: './start-game.component.css'
})

export class StartGameComponent {

  constructor(private router: Router, private createdGameService: CreatedGameServiceService){}

  playerName: string = "";

  startGame(): void {
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
        this.createdGameService.setPlayer(this.playerName);
        this.createdGameService.setGameId(response.gameId);
        this.playerName = "";
        this.router.navigate(["/game"]);
      });
  }
}
