import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsOverviewComponent } from './carts-overview.component';

describe('CartsOverviewComponent', () => {
  let component: CartsOverviewComponent;
  let fixture: ComponentFixture<CartsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
