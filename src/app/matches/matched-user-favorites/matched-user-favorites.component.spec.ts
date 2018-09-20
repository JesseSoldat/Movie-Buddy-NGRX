import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedUserFavoritesComponent } from './matched-user-favorites.component';

describe('MatchedUserFavoritesComponent', () => {
  let component: MatchedUserFavoritesComponent;
  let fixture: ComponentFixture<MatchedUserFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedUserFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedUserFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
