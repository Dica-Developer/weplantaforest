import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPageComponent } from './privacy-page.component';

describe('PrivacyPageComponent', () => {
  let component: PrivacyPageComponent;
  let fixture: ComponentFixture<PrivacyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PrivacyPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
