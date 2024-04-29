import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameTileComponent } from './board-game-tile.component';

describe('BoardGameTileComponent', () => {
  let component: BoardGameTileComponent;
  let fixture: ComponentFixture<BoardGameTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGameTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardGameTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
