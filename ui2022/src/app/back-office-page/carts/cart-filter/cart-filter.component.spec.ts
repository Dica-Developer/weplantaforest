import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFilterComponent } from './cart-filter.component';

describe('CartFilterComponent', () => {
  let component: CartFilterComponent;
  let fixture: ComponentFixture<CartFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
