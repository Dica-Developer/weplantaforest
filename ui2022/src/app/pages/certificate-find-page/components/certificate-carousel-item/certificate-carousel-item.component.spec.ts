import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCarouselItemComponent } from './certificate-carousel-item.component';

describe('CertificateCarouselItemComponent', () => {
  let component: CertificateCarouselItemComponent;
  let fixture: ComponentFixture<CertificateCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CertificateCarouselItemComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CertificateCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
