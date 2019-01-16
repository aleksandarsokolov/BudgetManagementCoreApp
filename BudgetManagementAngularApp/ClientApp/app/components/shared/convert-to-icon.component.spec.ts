import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToIconComponent } from './convert-to-icon.component';

describe('ConvertToIconComponent', () => {
  let component: ConvertToIconComponent;
  let fixture: ComponentFixture<ConvertToIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertToIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertToIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
