import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedUsersComponent } from './matched-users.component';

describe('MatchedUsersComponent', () => {
  let component: MatchedUsersComponent;
  let fixture: ComponentFixture<MatchedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
