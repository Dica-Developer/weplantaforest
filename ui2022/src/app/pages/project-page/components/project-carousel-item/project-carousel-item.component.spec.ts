import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCarouselItemComponent } from './project-carousel-item.component';

describe('ProjectCarouselItemComponent', () => {
  let component: ProjectCarouselItemComponent;
  let fixture: ComponentFixture<ProjectCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCarouselItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
