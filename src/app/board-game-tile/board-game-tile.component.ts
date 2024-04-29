import { Component, Input } from '@angular/core';
import { BoardGame } from '../types/board-game';
import { MatCardModule } from '@angular/material/card';
import { AttrSpanPipe } from '../attr-span.pipe';

@Component({
  selector: 'board-game-tile',
  standalone: true,
  imports: [MatCardModule, AttrSpanPipe],
  templateUrl: './board-game-tile.component.html',
  styleUrl: './board-game-tile.component.css'
})
export class BoardGameTileComponent {
  @Input()
  game!: BoardGame;
}
