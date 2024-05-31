import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlantingComponent } from './custom-planting.component';

describe('CustomPlantingComponent', () => {
  let component: CustomPlantingComponent;
  let fixture: ComponentFixture<CustomPlantingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CustomPlantingComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CustomPlantingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
