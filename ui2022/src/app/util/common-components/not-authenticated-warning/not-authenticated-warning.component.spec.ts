import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthenticatedWarningComponent } from './not-authenticated-warning.component';

describe('NotAuthenticatedWarningComponent', () => {
  let component: NotAuthenticatedWarningComponent;
  let fixture: ComponentFixture<NotAuthenticatedWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthenticatedWarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAuthenticatedWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
