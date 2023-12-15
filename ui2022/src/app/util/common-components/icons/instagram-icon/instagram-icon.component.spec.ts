import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramIconComponent } from './instagram-icon.component';

describe('InstagramIconComponent', () => {
  let component: InstagramIconComponent;
  let fixture: ComponentFixture<InstagramIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
