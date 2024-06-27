import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGiftOverviewComponent } from './profile-gift-overview.component';

describe('ProfileGiftOverviewComponent', () => {
  let component: ProfileGiftOverviewComponent;
  let fixture: ComponentFixture<ProfileGiftOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProfileGiftOverviewComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProfileGiftOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
