import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeRouterOutletComponent } from './back-office-router-outlet.component';

describe('BackOfficeRouterOutletComponent', () => {
  let component: BackOfficeRouterOutletComponent;
  let fixture: ComponentFixture<BackOfficeRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeRouterOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
