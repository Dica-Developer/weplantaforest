import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTreeComponent } from './plant-tree.component';

describe('PlantTreeComponent', () => {
  let component: PlantTreeComponent;
  let fixture: ComponentFixture<PlantTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PlantTreeComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PlantTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
