import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatedGameServiceService {
  private gameId: number = 0;
  private player: string = "";

  constructor() { }

  getGameId(): number {
    return this.gameId;
  }

  setGameId(gameId: number): void {
    this.gameId = gameId;
  }

  getPlayer(): string {
    return this.player;
  }

  setPlayer(player: string): void {
    this.player = player;
  }
}
