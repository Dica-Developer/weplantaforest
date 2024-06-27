import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditDataComponent } from './project-edit-data.component';

describe('ProjectEditDataComponent', () => {
  let component: ProjectEditDataComponent;
  let fixture: ComponentFixture<ProjectEditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProjectEditDataComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
