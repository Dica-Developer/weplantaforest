import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportsHeaderComponent } from './project-reports-header.component';

describe('ProjectReportsHeaderComponent', () => {
  let component: ProjectReportsHeaderComponent;
  let fixture: ComponentFixture<ProjectReportsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectReportsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectReportsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
