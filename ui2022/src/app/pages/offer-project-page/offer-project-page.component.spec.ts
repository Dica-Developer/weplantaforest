import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferProjectPageComponent } from './offer-project-page.component';

describe('OfferProjectPageComponent', () => {
  let component: OfferProjectPageComponent;
  let fixture: ComponentFixture<OfferProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferProjectPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
