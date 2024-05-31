import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlantTreeInputComponent } from './custom-plant-tree-input.component';

describe('PlantbagTreeInputComponent', () => {
  let component: CustomPlantTreeInputComponent;
  let fixture: ComponentFixture<CustomPlantTreeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CustomPlantTreeInputComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPlantTreeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
