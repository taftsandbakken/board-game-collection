import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BoardGameService } from '../board-game.service';
import { BoardGameTileComponent } from '../board-game-tile/board-game-tile.component';
import { BoardGame } from '../types/board-game';
import { BoardGameCollection } from '../types/board-game-collection';

export enum PageState {
  Loading = 'Loading',
  Ready = 'Ready',
  Error = 'Error'
}

@Component({
  selector: 'board-game-collection',
  standalone: true,
  imports: [
    BoardGameTileComponent,
    FormsModule, MatTabsModule,
    MatButtonModule, MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './board-game-collection.component.html',
  styleUrl: './board-game-collection.component.css',
  providers: [BoardGameService]
})
export class BoardGameCollectionComponent implements OnInit {
  // Make enums into public params for html to use
  PageState = PageState;

  pageState = PageState.Loading;
  username = 'taftsandbakken';
  errorMsg = '';
  myBoardGameCollection: BoardGame[] = [];
  myBoardGameWishlist: BoardGame[] = [];

  constructor(private boardGameService: BoardGameService) {}

  ngOnInit() {
    this.loadGames()
  }

  // Load the owned board game collection and wishlist from API
  public loadGames(): void {
    if (this.isInvalidUsername())
      return;
    this.pageState = PageState.Loading;

    const [ownCollectionObs, wishlistObs] = this.boardGameService.getBoardGameLists(this.username.toLocaleLowerCase().trim());
    forkJoin([
      ownCollectionObs.pipe(catchError(err => of(err))),
      wishlistObs.pipe(catchError(err => of(err)))
    ]).subscribe((results: BoardGameCollection[]) => {
      this.handleCollectionResults(results);
    });
  }

  // Check if username is invalid
  private isInvalidUsername(): boolean {
    return !this.username || this.username.trim() === '';
  }

  // Handle errors from API
  private handleAPIError(err: string) {
    this.pageState = PageState.Error;
    this.errorMsg = err;
  }

  // Handle the API results
  // Index 0 is for the owned collection, index 1 is for the wishlist
  private handleCollectionResults(results: BoardGameCollection[]): void {
    if (!results[0].items || !results[1].items) {
      this.handleAPIError(this.getErrorMessage(results));
      return;
    }
    this.myBoardGameCollection = results[0].items.item;
    this.myBoardGameWishlist = results[1].items.item;
    this.pageState = PageState.Ready;
  }

  // The error message could be in multiple places depending on where and how it failed
  private getErrorMessage(results: BoardGameCollection[]): string {
    return results[0].message?._text ?? results[1].message?._text ?? results[0].message ?? results[1].message ?? 'Unknown Error';
  }
}
