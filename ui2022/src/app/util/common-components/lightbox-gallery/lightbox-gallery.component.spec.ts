import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightboxGalleryComponent } from './lightbox-gallery.component';

describe('LightboxGalleryComponent', () => {
  let component: LightboxGalleryComponent;
  let fixture: ComponentFixture<LightboxGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightboxGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightboxGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
