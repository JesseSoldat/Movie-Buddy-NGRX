import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRowBtnsComponent } from './top-row-btns.component';

describe('TopRowBtnsComponent', () => {
  let component: TopRowBtnsComponent;
  let fixture: ComponentFixture<TopRowBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRowBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRowBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
