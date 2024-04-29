import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardGameCollectionComponent } from './board-game-collection/board-game-collection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardGameCollectionComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
