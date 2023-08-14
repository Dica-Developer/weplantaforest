import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCertificatesComponent } from './profile-certificates.component';

describe('ProfileCertificatesComponent', () => {
  let component: ProfileCertificatesComponent;
  let fixture: ComponentFixture<ProfileCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
