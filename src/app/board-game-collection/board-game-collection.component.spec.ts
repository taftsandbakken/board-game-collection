import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameCollectionComponent } from './board-game-collection.component';

describe('BoardGameCollectionComponent', () => {
  let component: BoardGameCollectionComponent;
  let fixture: ComponentFixture<BoardGameCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGameCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardGameCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
