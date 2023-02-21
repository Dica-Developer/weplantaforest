import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantbagPageComponent } from './plantbag-page.component';

describe('PlantbagPageComponent', () => {
  let component: PlantbagPageComponent;
  let fixture: ComponentFixture<PlantbagPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantbagPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantbagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
