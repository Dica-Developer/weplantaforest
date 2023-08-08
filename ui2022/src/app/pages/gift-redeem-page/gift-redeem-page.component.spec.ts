import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftRedeemPageComponent } from './gift-redeem-page.component';

describe('GiftRedeemPageComponent', () => {
  let component: GiftRedeemPageComponent;
  let fixture: ComponentFixture<GiftRedeemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftRedeemPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftRedeemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
