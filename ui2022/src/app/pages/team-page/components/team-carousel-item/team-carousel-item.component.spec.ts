import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCarouselItemComponent } from './team-carousel-item.component';

describe('TeamCarouselItemComponent', () => {
  let component: TeamCarouselItemComponent;
  let fixture: ComponentFixture<TeamCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCarouselItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
