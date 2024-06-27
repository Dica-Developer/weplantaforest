import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieConfirmationComponent } from './cookie-confirmation.component';

describe('CookieConfirmationComponent', () => {
  let component: CookieConfirmationComponent;
  let fixture: ComponentFixture<CookieConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CookieConfirmationComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CookieConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
