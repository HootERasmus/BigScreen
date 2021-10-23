import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenCardComponent } from './screen-card.component';

describe('ScreenCardComponent', () => {
  let component: ScreenCardComponent;
  let fixture: ComponentFixture<ScreenCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
