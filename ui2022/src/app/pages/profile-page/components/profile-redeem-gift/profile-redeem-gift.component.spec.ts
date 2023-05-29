import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRedeemGiftComponent } from './profile-redeem-gift.component';

describe('ProfileRedeemGiftComponent', () => {
  let component: ProfileRedeemGiftComponent;
  let fixture: ComponentFixture<ProfileRedeemGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRedeemGiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRedeemGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
