import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantedTreesComponent } from './planted-trees.component';

describe('PlantedTreesComponent', () => {
  let component: PlantedTreesComponent;
  let fixture: ComponentFixture<PlantedTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PlantedTreesComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PlantedTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
