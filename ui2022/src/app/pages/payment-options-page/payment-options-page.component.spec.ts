import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsPageComponent } from './payment-options-page.component';

describe('PaymentOptionsPageComponent', () => {
  let component: PaymentOptionsPageComponent;
  let fixture: ComponentFixture<PaymentOptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOptionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
