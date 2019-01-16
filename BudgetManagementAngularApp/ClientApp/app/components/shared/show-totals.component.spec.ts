import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTotalsComponent } from './show-totals.component';

describe('ShowTotalsComponent', () => {
  let component: ShowTotalsComponent;
  let fixture: ComponentFixture<ShowTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
