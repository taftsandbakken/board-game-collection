import { Injectable } from '@angular/core';
import { xml2js } from 'xml-js';
import { from, Observable } from 'rxjs';
import { BoardGameCollection } from './types/board-game-collection';

@Injectable({
  providedIn: 'root'
})
export class BoardGameService {
  private readonly BOARD_GAME_COLLECTION_URL = 'https://api.geekdo.com/xmlapi/collection/';
  private readonly OWN_PARAM = 'own=1';
  private readonly WISHLIST_PARAM = 'wishlist=1';
  private readonly XML2JS_OPTIONS = {compact: true};

  constructor() {}

  // Get the board game collection and wishlist from the API and return both
  public getBoardGameLists(username: string): Observable<BoardGameCollection>[] {
    const ownObs = this.getBoardGameCollection(username, this.OWN_PARAM);
    const wishlistObs = this.getBoardGameCollection(username, this.WISHLIST_PARAM);
    return [ownObs, wishlistObs];
  }

  // Get a board game collection from the API
  // Convert to an observable for practice using rxjs
  private getBoardGameCollection(username: string, param: string): Observable<any> {
    return from(new Promise((resolve, reject) => {
      fetch(`${this.BOARD_GAME_COLLECTION_URL}${username}?${param}`).then((result: any) => {
        this.handleAPIResult(result, resolve);
      }).catch(error => {
        reject(error);
      });
    }));
  }

  // Handle the result's dataStream and then resolve when the conversion is done.
  private handleAPIResult(result: any, resolve: (value: unknown) => void): void {
    result.text().then((result: any) => {
      resolve(this.convertXmlToJS(result));
    });
  }

  // This API returns XML results. Here we convert it into a JS object
  private convertXmlToJS(xml: string) {
    return xml2js(xml, this.XML2JS_OPTIONS);
  }
}
