import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPlantingComponent } from './project-planting.component';

describe('ProjectPlantingComponent', () => {
  let component: ProjectPlantingComponent;
  let fixture: ComponentFixture<ProjectPlantingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProjectPlantingComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPlantingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
