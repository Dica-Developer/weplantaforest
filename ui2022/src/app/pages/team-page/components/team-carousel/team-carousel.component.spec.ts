import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCarouselComponent } from './team-carousel.component';

describe('TeamCarouselComponent', () => {
  let component: TeamCarouselComponent;
  let fixture: ComponentFixture<TeamCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
