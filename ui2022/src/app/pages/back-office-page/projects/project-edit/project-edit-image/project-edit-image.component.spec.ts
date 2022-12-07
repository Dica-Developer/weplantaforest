import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditImageComponent } from './project-edit-image.component';

describe('ProjectEditImageComponent', () => {
  let component: ProjectEditImageComponent;
  let fixture: ComponentFixture<ProjectEditImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
