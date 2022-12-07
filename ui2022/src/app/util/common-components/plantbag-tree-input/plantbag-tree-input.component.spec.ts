import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantbagTreeInputComponent } from './plantbag-tree-input.component';

describe('PlantbagTreeInputComponent', () => {
  let component: PlantbagTreeInputComponent;
  let fixture: ComponentFixture<PlantbagTreeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantbagTreeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantbagTreeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
