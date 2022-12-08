import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRouterOutletComponent } from './user-router-outlet.component';

describe('UserRouterOutletComponent', () => {
  let component: UserRouterOutletComponent;
  let fixture: ComponentFixture<UserRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRouterOutletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
