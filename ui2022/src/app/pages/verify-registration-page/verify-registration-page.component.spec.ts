import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRegistrationPageComponent } from './verify-registration-page.component';

describe('VerifyRegistrationPageComponent', () => {
  let component: VerifyRegistrationPageComponent;
  let fixture: ComponentFixture<VerifyRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyRegistrationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
