import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantbagComponent } from './plantbag.component';

describe('PlantbagComponent', () => {
  let component: PlantbagComponent;
  let fixture: ComponentFixture<PlantbagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantbagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantbagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
