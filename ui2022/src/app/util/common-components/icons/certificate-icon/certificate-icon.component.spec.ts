import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateIconComponent } from './certificate-icon.component';

describe('CertificateIconComponent', () => {
  let component: CertificateIconComponent;
  let fixture: ComponentFixture<CertificateIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
