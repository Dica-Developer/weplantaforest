import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleIconComponent } from './circle-icon.component';

describe('CircleIconComponent', () => {
  let component: CircleIconComponent;
  let fixture: ComponentFixture<CircleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
