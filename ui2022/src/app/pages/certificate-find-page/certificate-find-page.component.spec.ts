import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateFindPageComponent } from './certificate-find-page.component';

describe('CertificateFindPageComponent', () => {
  let component: CertificateFindPageComponent;
  let fixture: ComponentFixture<CertificateFindPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateFindPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateFindPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
