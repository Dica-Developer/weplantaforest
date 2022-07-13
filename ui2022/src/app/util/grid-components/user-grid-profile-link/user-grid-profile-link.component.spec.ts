import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGridProfileLinkComponent } from './user-grid-profile-link.component';

describe('UserGridProfileLinkComponent', () => {
  let component: UserGridProfileLinkComponent;
  let fixture: ComponentFixture<UserGridProfileLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGridProfileLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
