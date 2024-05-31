import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportsOverviewPageComponent } from './project-reports-overview-page.component';

describe('ProjectReportsOverviewPageComponent', () => {
  let component: ProjectReportsOverviewPageComponent;
  let fixture: ComponentFixture<ProjectReportsOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProjectReportsOverviewPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProjectReportsOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
