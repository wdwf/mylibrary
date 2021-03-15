import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBookComponent } from './input-book.component';

describe('InputBookComponent', () => {
  let component: InputBookComponent;
  let fixture: ComponentFixture<InputBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
