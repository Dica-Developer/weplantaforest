import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAreaComponent } from './offer-area.component';

describe('OfferAreaComponent', () => {
  let component: OfferAreaComponent;
  let fixture: ComponentFixture<OfferAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
