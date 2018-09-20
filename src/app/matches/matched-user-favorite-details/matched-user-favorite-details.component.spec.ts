import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedUserFavoriteDetailsComponent } from './matched-user-favorite-details.component';

describe('MatchedUserFavoriteDetailsComponent', () => {
  let component: MatchedUserFavoriteDetailsComponent;
  let fixture: ComponentFixture<MatchedUserFavoriteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedUserFavoriteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedUserFavoriteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
