import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTreeCarouselItemComponent } from './team-tree-carousel-item.component';

describe('TeamTreeCarouselItemComponent', () => {
  let component: TeamTreeCarouselItemComponent;
  let fixture: ComponentFixture<TeamTreeCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TeamTreeCarouselItemComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TeamTreeCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
