import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSelfPageComponent } from './plant-self-page.component';

describe('PlantSelfPageComponent', () => {
  let component: PlantSelfPageComponent;
  let fixture: ComponentFixture<PlantSelfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PlantSelfPageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PlantSelfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
