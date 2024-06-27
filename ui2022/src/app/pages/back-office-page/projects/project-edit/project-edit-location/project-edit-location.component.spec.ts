import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditLocationComponent } from './project-edit-location.component';

describe('ProjectEditLocationComponent', () => {
  let component: ProjectEditLocationComponent;
  let fixture: ComponentFixture<ProjectEditLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProjectEditLocationComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
