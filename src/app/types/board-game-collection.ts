import { BoardGame } from "./board-game";

export interface BoardGameCollection {
  items: {
    item: BoardGame[];
  }
  message: {
    _text: string;
  }
}
