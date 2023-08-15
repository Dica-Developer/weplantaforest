import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWidgetsComponent } from './profile-widgets.component';

describe('ProfileWidgetsComponent', () => {
  let component: ProfileWidgetsComponent;
  let fixture: ComponentFixture<ProfileWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
