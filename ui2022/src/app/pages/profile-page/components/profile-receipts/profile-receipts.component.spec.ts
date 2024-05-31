import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReceiptsComponent } from './profile-receipts.component';

describe('ProfileReceiptsComponent', () => {
  let component: ProfileReceiptsComponent;
  let fixture: ComponentFixture<ProfileReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProfileReceiptsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProfileReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
