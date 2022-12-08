import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingProcessComponent } from './planting-process.component';

describe('PlantingProcessComponent', () => {
  let component: PlantingProcessComponent;
  let fixture: ComponentFixture<PlantingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantingProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
