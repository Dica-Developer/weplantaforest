import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewTileComponent } from './project-overview-tile.component';

describe('ProjectOverviewTileComponent', () => {
  let component: ProjectOverviewTileComponent;
  let fixture: ComponentFixture<ProjectOverviewTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOverviewTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOverviewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
