import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookIconComponent } from './facebook-icon.component';

describe('FacebookIconComponent', () => {
  let component: FacebookIconComponent;
  let fixture: ComponentFixture<FacebookIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
