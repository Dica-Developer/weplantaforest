import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditTreeComponent } from './project-edit-tree.component';

describe('ProjectEditTreeComponent', () => {
  let component: ProjectEditTreeComponent;
  let fixture: ComponentFixture<ProjectEditTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
