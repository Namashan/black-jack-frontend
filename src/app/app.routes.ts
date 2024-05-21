import { Routes } from '@angular/router';
import { StartGameComponent } from './start-game/start-game.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {
        path: '',
        component: StartGameComponent,
        title: 'Home page'
    },
    {
        path: "game",
        component: GameComponent,
        title: "Game Page"
    }
];
